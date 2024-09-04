import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Request,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators.ts/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  // TODO: replace Parameters with dto
  signIn(@Body() signInDto: Record<string, string>) {
    const token = this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );

    return token;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
