import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  Request,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators.ts/public.decorator';
import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = this.authService.signIn(signInDto);
    // console.log('token', token);
    // res.cookie('accessToken', token, {
    //   httpOnly: true,
    //   maxAge: 3600,
    // });
    // return { message: 'Login successfull' };
    return token;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    const user = this.authService.signUp(signUpDto);

    return user;
  }

  @Get('profile')
  getProfile(@Request() req) {
    // const accessToken = req.cookies['accessToken'];
    return req.user;
  }
}
