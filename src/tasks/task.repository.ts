import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly entityManager: EntityManager) {
    super(Task, entityManager);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    // The Reason we are using andWhere instead of where is because
    // we want to include both the status and search in the query
    // if we use where then it will only include the last condition (it will overwrite the previous condition)

    if (status) {
      // Where task.status is defined in the createQueryBuilder('task')
      // :status is the name of the attribute in database, : means it is a placeholder
      // { status } is the value of the placeholder passed by the user
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      //  { search: `%${search}%` } - is used to search for a string in the provided string
      // { search } (Just like above for status) - is used to search for a string that is exactly equal to the provided string
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
        // { search },
      );
    }

    const tasks = await query.getMany();

    return tasks;
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
