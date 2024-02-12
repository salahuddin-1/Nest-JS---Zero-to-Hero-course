import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepository extends Repository<Task> {}
