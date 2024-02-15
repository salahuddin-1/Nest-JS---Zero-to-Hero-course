import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// This decorator will extract the user from the request object and return it
export const GetUser = createParamDecorator((data, req): User => {
  const userFromRequest = req.args[0].user;

  return userFromRequest;
});
