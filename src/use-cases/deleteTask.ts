import { TaskRepository } from "../repositories/taskRepository";
import { DeleteTaskDTO } from "../DTOs/deleteTaskDTO";

export class DeleteTask {
  constructor (
    private taskRepository : TaskRepository
  ) {}

  public async execute({id} : DeleteTaskDTO) {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error(`Task ${id} was not found`);
    }
    await this.taskRepository.deleteById(task.id);
  }
}