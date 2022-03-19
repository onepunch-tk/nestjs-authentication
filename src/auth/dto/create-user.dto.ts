import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ComfirmPassword } from 'src/lib/decorators/comfirm-passwd.decorator';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
  })
  password: string;

  @ComfirmPassword('password')
  comfirmPassword: string;
}
