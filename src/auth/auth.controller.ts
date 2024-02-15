import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // In UseGuards, we call the AuthGuard and pass the name of the strategy we want to use
  // Here we are using the 'my_jwt_strategy' strategy, defined in jwt.strategy.ts
  // Nest JS looks for the strategy with the name 'my_jwt_strategy' and uses it
  @Post('/test')
  @UseGuards(AuthGuard('my_jwt_strategy'))
  test(@GetUser() user: User) {
    console.log(user);
  }
}
