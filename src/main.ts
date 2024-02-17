import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server') as { port: number };

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  // If env.PORT is not set, use the port from the config file
  // We can set the port in env.PORT like this: PORT=3005 npm run start:dev
  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
