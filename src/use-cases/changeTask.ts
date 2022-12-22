import { TaskRepository } from "../repositories/taskRepository";

export interface ChangeTaskDTO {
  id: number;
  userId: number;
  text?: string;
  finished?: boolean;
}

export class ChangeTask {
  constructor (
    private taskRepository: TaskRepository
  ){}

  public async execute(changes: ChangeTaskDTO){
    await this.taskRepository.update(changes);
  }
}