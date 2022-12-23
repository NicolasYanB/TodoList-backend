import { format } from "date-fns";
import { TaskRepository } from "../repositories/taskRepository";

export interface ChangeTaskDTO {
  id: number;
  userId: number;
  text?: string;
  finished?: boolean;
  finishedDate?: string;
}

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
    await this.taskRepository.update(changes);
  }
}