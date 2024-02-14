import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username =
      await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // After the user is validated (password and username are correct), we create a JWT token

    // We can add roles, email, or any other information we want to the payload
    // But don't add sensitive information
    const payload: JwtPayload = { username: username };
    const accessToken = await this.jwtService.signAsync(payload);

    // Return an object with the access token
    // Promise<{ accessToken: string }> - We are returning a Promise of type Object with key
    // as accessToken and value of type string
    return { accessToken: accessToken };
  }
}
