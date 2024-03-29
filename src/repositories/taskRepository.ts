import { Task } from "../entities/task";
import { ChangeTaskDTO } from "../DTOs/changeTaskDTO";
import { CreateTaskDTO } from "../DTOs/createTaskDTO";

export interface findTaskDTO {
  id?: number;
  userId?: number;
  text?: string;
  finished?: boolean;
  createDate?: string;
}

export interface TaskRepository {
  create(task : CreateTaskDTO) : Promise<Task>;
  findAll() : Promise<Task[]>;
  findById(id: number) : Promise<Task | null>;
  findBy(searchParams: findTaskDTO) : Promise<Task[]>;
  update(changes: ChangeTaskDTO) : Promise<Task>;
  deleteById(id: number) : Promise<Task>;
}