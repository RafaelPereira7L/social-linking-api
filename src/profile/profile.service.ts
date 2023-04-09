import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto, userId: number) {
    return await this.prisma.profile.create({
      data: {
        ...createProfileDto,
        user: { connect: { id: userId } },
      },
    });
  }

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findOne(username: string) {
    const profile = await this.prisma.profile.findFirst({
      where: { username },
    });

    if (!profile) {
      throw new NotFoundException(
        `Profile with username ${username} not found`,
      );
    }

    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.profile.delete({ where: { id } });
  }
}
