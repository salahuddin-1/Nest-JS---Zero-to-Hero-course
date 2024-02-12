import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
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
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with ID "${id}" not found`);
  //   }
  //   return found;
  // }
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
