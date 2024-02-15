import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

// Here, "my_jwt_strategy" is the name of the strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'my_jwt_strategy') {
  constructor(private userRepository: UserRepository) {
    super({
      // Internally the "jwtFromRequest" method will extract the JWT from the request headers
      // and we are specifying that the JWT will be in the Authorization header
      // with the Bearer scheme, e.g. Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  // The "validate" method should be overridden, this "validate" method
  // is not our own method, it is a method that must be implemented when
  // we extend the PassportStrategy class.
  async validate(
    payload: JwtPayload, // The payload: JwtPayload is the decoded JWT token's payload
  ): Promise<User> {
    // This method is called after Passport verifies the JWT's signature
    // and decodes the token. If the token is not proper, this method will not be called

    const { username } = payload;

    const user = await this.userRepository.findOneBy({
      username: username,
    });

    // Here we are doing some validation checks, like checking if the user exists
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
