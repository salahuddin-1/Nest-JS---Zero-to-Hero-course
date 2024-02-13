import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto) {
  //   // Destructure the filterDto object
  //   const { search, status } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = this.tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = this.tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  // async getTaskById(id: number) {
  //   this.taskRepository.myFunction();
  //   const record = await this.taskRepository.findOne({ where: { id } });

  //   // if (!record) {
  //   //   throw new NotFoundException(`Task with ID "${id}" not found`);
  //   // }

  //   // return record;
  // }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    this.taskRepository.myFunction();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  // deleteTask(id: string): void {
  //   const found: Task = this.getTaskById(id);
  //   this.tasks.forEach((task, index) => {
  //     if (task.id === id) {
  //       this.tasks.splice(index, 1);
  //     }
  //   });
  //   // return selectedTask;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid.v1(),
  //     title: title,
  //     description: description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const selectedTask: Task = this.getTaskById(id);
  //   selectedTask.status = status;
  //   return selectedTask;
  // }
}
