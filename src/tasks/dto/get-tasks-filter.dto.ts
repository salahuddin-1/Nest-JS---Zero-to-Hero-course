import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

// @IsOptional() means that if this particular param is Optional, if the param is
// not provided then all the other validators gets ignored
// in case of search if search param is provided then it will check all the validators
// if not then it will ignore the @IsNotEmpty() validator
