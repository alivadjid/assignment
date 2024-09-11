import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { errors } from './errors.list';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByUsername(signInDto.username);
    console.log('user', user);
    if (!user || user.password !== signInDto.password) {
      throw new BadRequestException(errors.INVALID_CREDENTIALS);
    }
    const payload = { username: user.username, sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: 3600,
    });
    return {
      accessToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    console.log('signUpDto', signUpDto);
    if (signUpDto.password !== signUpDto.confirmPassword) {
      throw new BadRequestException(errors.PASSWORDS_DO_NOT_MATCH);
    }

    const user = await this.usersService.findByUsername(signUpDto.username);
    if (user) {
      throw new BadRequestException(errors.USERNAME_ALREADY_EXISTS);
    }

    const createdUser = await this.usersService.create(signUpDto);
    return createdUser;
  }
}
