import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OtpType, PrismaService, Role } from '../../database';
import { MailService } from '../mail/mail.service';
import {
  AdminLoginDto,
  CreateStaffDto,
  CustomerLoginDto,
  RegisterCustomerDto,
  ResendOtpDto,
  StaffLoginDto,
  VerifyOtpDto,
} from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly saltRounds = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  private generate6DigitOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateToken(user: {
    id: string;
    email?: string | null;
    username?: string | null;
    role: Role;
  }): string {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: {
    id: string;
    email?: string | null;
    username?: string | null;
    role: Role;
    isEmailVerified: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // ==========================================
  // CUSTOMER AUTHENTICATION FLOW
  // ==========================================

  async registerCustomer(dto: RegisterCustomerDto) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);

    let user;
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        throw new ConflictException(
          'An account with this email address already exists. Please sign in.',
        );
      }
      // If user exists but unverified, update password and issue a fresh OTP
      user = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
        },
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: Role.CUSTOMER,
          isEmailVerified: false,
          isActive: true,
        },
      });
    }

    // Invalidate any existing active OTPs for this email
    await this.prisma.otp.updateMany({
      where: { email, isUsed: false },
      data: { isUsed: true },
    });

    // Create 6-digit OTP valid for 10 minutes
    const code = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.otp.create({
      data: {
        email,
        code,
        type: OtpType.EMAIL_VERIFICATION,
        expiresAt,
        userId: user.id,
      },
    });

    await this.mailService.sendOtpEmail(
      email,
      code,
      'Customer Account Verification',
    );

    return {
      message:
        'Registration initiated. Please enter the 6-digit verification code sent to your email.',
      email,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const email = dto.email.trim().toLowerCase();
    const code = dto.code.trim();

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('No account found for this email address.');
    }

    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        email,
        code,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      throw new BadRequestException(
        'Invalid or expired verification code. Please request a new one.',
      );
    }

    // Mark OTP used
    await this.prisma.otp.update({
      where: { id: otpRecord.id },
      data: { isUsed: true },
    });

    // Mark user as verified
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true },
    });

    const token = this.generateToken(updatedUser);

    return {
      message: 'Email verified successfully! You are now logged in.',
      token,
      user: this.sanitizeUser(updatedUser),
    };
  }

  async resendOtp(dto: ResendOtpDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('No account found for this email address.');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException(
        'This account is already verified. Please sign in.',
      );
    }

    // Invalidate previous OTPs
    await this.prisma.otp.updateMany({
      where: { email, isUsed: false },
      data: { isUsed: true },
    });

    const code = this.generate6DigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.otp.create({
      data: {
        email,
        code,
        type: OtpType.EMAIL_VERIFICATION,
        expiresAt,
        userId: user.id,
      },
    });

    await this.mailService.sendOtpEmail(
      email,
      code,
      'Customer Account Verification',
    );

    return {
      message: 'A fresh verification code has been dispatched to your email.',
      email,
    };
  }

  async customerLogin(dto: CustomerLoginDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== Role.CUSTOMER) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Your account has been deactivated. Please contact support.',
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isEmailVerified) {
      // Auto-trigger a new OTP
      await this.prisma.otp.updateMany({
        where: { email, isUsed: false },
        data: { isUsed: true },
      });

      const code = this.generate6DigitOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await this.prisma.otp.create({
        data: {
          email,
          code,
          type: OtpType.EMAIL_VERIFICATION,
          expiresAt,
          userId: user.id,
        },
      });

      await this.mailService.sendOtpEmail(
        email,
        code,
        'Customer Account Verification',
      );

      throw new ForbiddenException({
        message:
          'Email not verified. A fresh verification code has been dispatched to your email.',
        code: 'EMAIL_NOT_VERIFIED',
        email,
      });
    }

    const token = this.generateToken(user);
    return {
      message: 'Customer sign in successful.',
      token,
      user: this.sanitizeUser(user),
    };
  }

  // ==========================================
  // WORKER & OFFICE STAFF LOGIN FLOW
  // ==========================================

  async staffLogin(dto: StaffLoginDto) {
    const username = dto.username.trim();

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid staff username or password.');
    }

    if (user.role !== Role.WORKER && user.role !== Role.OFFICE_STAFF) {
      throw new UnauthorizedException(
        'Invalid credentials for staff portal access.',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Your staff account has been deactivated. Please contact Super Admin.',
      );
    }

    if (dto.portalRole && user.role !== dto.portalRole) {
      const expectedPortal = dto.portalRole.toLowerCase().replace('_', ' ');
      const userRole = user.role.toLowerCase().replace('_', ' ');
      throw new ForbiddenException(
        `Access denied: This portal is designated for ${expectedPortal}s only. Your account is registered as ${userRole}. Please use your dedicated portal.`,
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid staff username or password.');
    }

    const token = this.generateToken(user);
    return {
      message: `${user.role} sign in successful.`,
      token,
      user: this.sanitizeUser(user),
    };
  }

  // ==========================================
  // SUPER ADMIN LOGIN FLOW
  // ==========================================

  async adminLogin(dto: AdminLoginDto) {
    const identifier = dto.identifier.trim();

    // Support logging in by either email or username
    const user = await this.prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
        OR: [
          { email: identifier.toLowerCase() },
          { username: identifier },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid administrator credentials.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Super Admin account has been deactivated.',
      );
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid administrator credentials.');
    }

    const token = this.generateToken(user);
    return {
      message: 'Super Admin sign in successful.',
      token,
      user: this.sanitizeUser(user),
    };
  }

  // ==========================================
  // SUPER ADMIN STAFF MANAGEMENT FLOW
  // ==========================================

  async createStaff(dto: CreateStaffDto) {
    const username = dto.username.trim();

    if (dto.role !== Role.WORKER && dto.role !== Role.OFFICE_STAFF) {
      throw new BadRequestException(
        'Invalid role specified. Staff role must be either WORKER or OFFICE_STAFF.',
      );
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException(
        `A user with username '${username}' already exists. Please choose a different username.`,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, this.saltRounds);

    const newStaff = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: dto.role,
        isEmailVerified: true, // Staff created by admin are pre-verified
        isActive: true,
      },
    });

    this.logger.log(
      `Staff member created: username='${username}', role='${dto.role}'`,
    );

    return {
      message: `${dto.role.replace('_', ' ')} created successfully.`,
      staff: this.sanitizeUser(newStaff),
    };
  }

  async listStaff(role?: Role) {
    const whereClause: any = {
      role: role ? role : { in: [Role.WORKER, Role.OFFICE_STAFF] },
    };

    const staffList = await this.prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return staffList;
  }

  async deleteStaff(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Staff member not found');
    }

    if (user.role === Role.SUPER_ADMIN) {
      throw new ForbiddenException('Super Admin accounts cannot be deleted');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'Staff member removed successfully' };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User profile not found');
    }

    return user;
  }
}
