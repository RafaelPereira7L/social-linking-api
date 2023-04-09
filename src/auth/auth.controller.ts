import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(signInDto);
    return this.authService.login(user);
  }
}
