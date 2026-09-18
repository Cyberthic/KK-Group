import { Injectable } from '@nestjs/common';
import { PrismaService, Role, User } from '../../database';
import { Prisma } from '../../generated/prisma';
import { ListStaffDto } from './dto';

@Injectable()
export class StaffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findMany(role?: Role): Promise<User[]> {
    const where: Prisma.UserWhereInput = role
      ? { role }
      : { role: { in: [Role.WORKER, Role.OFFICE_STAFF, Role.CUSTOMER] } };
    return this.prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findManyPaginated(dto: ListStaffDto) {
    const { role, search, page = 1, limit = 10 } = dto;
    
    const where: Prisma.UserWhereInput = {
      ...(role
        ? { role }
        : { role: { in: [Role.WORKER, Role.OFFICE_STAFF, Role.CUSTOMER] } }),
      ...(search && {
        OR: [
          { username: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const skip = (page - 1) * limit;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
