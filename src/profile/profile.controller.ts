import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpCode,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createProfileDto: CreateProfileDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createProfileDto.avatar = file.filename;
    }
    return await this.profileService.create(createProfileDto, req.user.sub);
  }

  @Get()
  async findAll() {
    return await this.profileService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.profileService.findOne(username);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return await this.profileService.update(+id, updateProfileDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.profileService.remove(+id);
  }
}
