import { format } from "date-fns";
import { TaskRepository } from "../repositories/taskRepository";
import { ChangeTaskDTO } from "../DTOs/changeTaskDTO";

export class ChangeTask {
  constructor (
    private taskRepository: TaskRepository
  ){}

  public async execute(changes: ChangeTaskDTO){
    const {id, userId} = changes;
    const [task] = await this.taskRepository.findBy({id, userId});
    if (!task.finished && changes.finished) {
      changes.finishedDate = format(new Date(), 'dd-MM-yyyy');
    }
    if (task.finished && !changes.finished) {
      changes.finishedDate = '';
    }
    await this.taskRepository.update(changes);
  }
}