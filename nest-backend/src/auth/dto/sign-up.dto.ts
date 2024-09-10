import { doesNotMatch } from 'assert';
import {
  IsString,
  IsNotEmpty,
  isNotEmpty,
  isString,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Match } from '../decorators.ts/match.decorator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: 'Password too weak',
    },
  )
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'Passwords do not match',
  })
  readonly confirmPassword: string;
}
