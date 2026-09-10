import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser, Public, Roles } from '../../common';
import { Role } from '../../database';
import { AuthService } from './auth.service';
import {
  AdminLoginDto,
  CreateStaffDto,
  CustomerLoginDto,
  RegisterCustomerDto,
  ResendOtpDto,
  StaffLoginDto,
  VerifyOtpDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ==========================================
  // CUSTOMER AUTH ENDPOINTS
  // ==========================================

  @Public()
  @Post('customer/register')
  @HttpCode(HttpStatus.CREATED)
  async registerCustomer(@Body() dto: RegisterCustomerDto) {
    return this.authService.registerCustomer(dto);
  }

  @Public()
  @Post('customer/verify-otp')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Public()
  @Post('customer/resend-otp')
  @HttpCode(HttpStatus.OK)
  async resendOtp(@Body() dto: ResendOtpDto) {
    return this.authService.resendOtp(dto);
  }

  @Public()
  @Post('customer/login')
  @HttpCode(HttpStatus.OK)
  async customerLogin(@Body() dto: CustomerLoginDto) {
    return this.authService.customerLogin(dto);
  }

  // ==========================================
  // WORKER & OFFICE STAFF LOGIN ENDPOINT
  // ==========================================

  @Public()
  @Post('staff/login')
  @HttpCode(HttpStatus.OK)
  async staffLogin(@Body() dto: StaffLoginDto) {
    return this.authService.staffLogin(dto);
  }

  // ==========================================
  // SUPER ADMIN LOGIN ENDPOINT
  // ==========================================

  @Public()
  @Post('admin/login')
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() dto: AdminLoginDto) {
    return this.authService.adminLogin(dto);
  }

  // ==========================================
  // SUPER ADMIN STAFF MANAGEMENT (PROTECTED)
  // ==========================================

  @Roles(Role.SUPER_ADMIN)
  @Post('admin/create-staff')
  @HttpCode(HttpStatus.CREATED)
  async createStaff(@Body() dto: CreateStaffDto) {
    return this.authService.createStaff(dto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('admin/staff')
  async listStaff(@Query('role') role?: Role) {
    return this.authService.listStaff(role);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete('admin/staff/:id')
  async deleteStaff(@Param('id') id: string) {
    return this.authService.deleteStaff(id);
  }

  // ==========================================
  // CURRENT AUTHENTICATED USER
  // ==========================================

  @Get('me')
  async getMe(@CurrentUser('id') userId: string) {
    return this.authService.getMe(userId);
  }
}
