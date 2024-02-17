import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as config from 'config';

const dbConfig = config.get('db') as {
  port: number;
  database: string;
  host: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
};

// These process.env.RDS_* variables will be set by AWS when we deploy our app
// in production. For now, we will use the values from the config file.

const synchronize = () => {
  if (process.env.TYPEORM_SYNC) {
    return true;
  }

  return dbConfig.synchronize;
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: Number.parseInt(process.env.RDS_PORT) || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  autoLoadEntities: dbConfig.autoLoadEntities,
  entities: [join(__dirname, '../**/*.entity.ts')],
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: synchronize(), // IN PRODUCTION SET TO FALSE
};
