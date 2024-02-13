import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly entityManager: EntityManager) {
    super(Task, entityManager);
  }

  async getTaskById(id: number): Promise<Task> {
    const task: Task = await this.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    // const task: Task = await this.findOneBy({ id: id });

    // if (!task) {
    //   throw new NotFoundException(
    //     `Unable to delete. Task with ID ${id} not found`,
    //   );
    // }

    // await this.remove(task);

    const deletedTask: DeleteResult = await this.delete(id);

    if (deletedTask.affected === 0) {
      throw new NotFoundException(
        `Unable to delete. Task with ID ${id} not found`,
      );
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id);

    task.status = status;

    await task.save();

    return task;
  }

  myFunction() {
    console.log('Hello from TaskRepository');
  }
}
