import { Task } from "../entities/task";
import { ChangeTaskDTO } from "../use-cases/changeTask";
import { CreateTaskDTO } from "../use-cases/createTask";

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
  findBy(searchParams: findTaskDTO) : Promise<Task | null>;
  update(changes: ChangeTaskDTO) : Promise<Task>;
}