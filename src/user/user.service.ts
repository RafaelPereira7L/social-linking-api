import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userEmailExists = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    console.log(userEmailExists);

    if (userEmailExists) {
      throw new Error('User email already exists');
    }
    const user = await this.prisma.user.create({ data: createUserDto });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    const result = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return result;
  }
}
