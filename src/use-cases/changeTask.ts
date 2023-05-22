import { format } from "date-fns";
import { TaskRepository } from "../repositories/taskRepository";
import { ChangeTaskDTO } from "../DTOs/changeTaskDTO";

export class ChangeTask {
  constructor (
    private taskRepository: TaskRepository
  ){}

  public async execute(changes: ChangeTaskDTO){
    await this.taskRepository.update(changes);
  }
}