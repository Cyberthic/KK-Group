import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PeopleRepository } from './people.repository';
import { CreatePersonDto, ListPeopleDto } from './dto';
import {
  AUTH_MESSAGES,
  PEOPLE_MESSAGES,
  SECURITY_CONSTANTS,
  VALIDATION_MESSAGES,
  resolveUniqueUsername,
} from '../../../common';
import { Role } from '../../../database';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepo: PeopleRepository) {}

  async createPerson(dto: CreatePersonDto) {
    if (
      dto.role !== Role.WORKER &&
      dto.role !== Role.OFFICE_STAFF &&
      dto.role !== Role.CUSTOMER
    ) {
      throw new BadRequestException(PEOPLE_MESSAGES.CANNOT_MANAGE_ROLE);
    }

    let finalUsername = dto.username?.trim();
    if (!finalUsername) {
      if (dto.email) {
        finalUsername = await resolveUniqueUsername(dto.email, async (candidate) => {
          const found = await this.peopleRepo.findByUsername(candidate);
          return !!found;
        });
      } else {
        throw new BadRequestException(VALIDATION_MESSAGES.USERNAME_REQUIRED);
      }
    } else {
      const existingUser = await this.peopleRepo.findByUsername(finalUsername);
      if (existingUser) {
        throw new BadRequestException(
          AUTH_MESSAGES.USERNAME_ALREADY_EXISTS(finalUsername),
        );
      }
    }

    if (dto.email) {
      const existingEmail = await this.peopleRepo.findByEmail(
        dto.email.toLowerCase().trim(),
      );
      if (existingEmail) {
        throw new BadRequestException(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS);
      }
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      SECURITY_CONSTANTS.BCRYPT_SALT_ROUNDS,
    );

    const user = await this.peopleRepo.create({
      username: finalUsername,
      email: dto.email ? dto.email.toLowerCase().trim() : undefined,
      password: hashedPassword,
      role: dto.role,
      isEmailVerified: true,
      isActive: true,
    });

    const { password: _, ...userWithoutPassword } = user;
    return {
      message: PEOPLE_MESSAGES.PERSON_CREATED_SUCCESS(dto.role),
      person: userWithoutPassword,
      staff: userWithoutPassword,
    };
  }

  async listPeople(dto: ListPeopleDto) {
    if (
      dto.role &&
      dto.role !== Role.WORKER &&
      dto.role !== Role.OFFICE_STAFF &&
      dto.role !== Role.CUSTOMER
    ) {
      throw new BadRequestException(PEOPLE_MESSAGES.CANNOT_MANAGE_ROLE);
    }
    const result = await this.peopleRepo.findManyPaginated(dto);

    return {
      ...result,
      data: result.data.map(({ password, ...user }) => user),
    };
  }

  async getPersonByUsername(username: string) {
    const user = await this.peopleRepo.findByUsername(username);
    if (!user) {
      throw new NotFoundException(PEOPLE_MESSAGES.PERSON_NOT_FOUND);
    }

    if (
      user.role !== Role.WORKER &&
      user.role !== Role.OFFICE_STAFF &&
      user.role !== Role.CUSTOMER
    ) {
      throw new NotFoundException(PEOPLE_MESSAGES.PERSON_NOT_FOUND);
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async deletePerson(id: string) {
    const user = await this.peopleRepo.findById(id);
    if (!user) {
      throw new NotFoundException(PEOPLE_MESSAGES.PERSON_NOT_FOUND);
    }

    if (
      user.role !== Role.WORKER &&
      user.role !== Role.OFFICE_STAFF &&
      user.role !== Role.CUSTOMER
    ) {
      throw new BadRequestException(PEOPLE_MESSAGES.CANNOT_MANAGE_ROLE);
    }

    await this.peopleRepo.delete(id);
    return { message: PEOPLE_MESSAGES.PERSON_DELETED_SUCCESS };
  }
}
