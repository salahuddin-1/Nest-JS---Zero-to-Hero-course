import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt') as { secret: string; expiresIn: number };

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // defaultStrategy: 'jwt' - Type of the token i.e. JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // secret - Should not be hardcoded in a real application nor shared publicly
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // expiresIn - The token will expire in 3600 seconds (1 hour)
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
