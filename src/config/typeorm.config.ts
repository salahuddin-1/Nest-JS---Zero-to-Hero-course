import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  autoLoadEntities: true,
  entities: [join(__dirname, '../**/*.entity.ts')],
  // entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  synchronize: true, // IN PRODUCTION SET TO FALSE
};
