import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  const userFromRequest = req.args[0].user;

  return userFromRequest;
});
