import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }

  deleteTask(id: number): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    return this.taskRepository.updateTaskStatus(id, status);
  }
}
