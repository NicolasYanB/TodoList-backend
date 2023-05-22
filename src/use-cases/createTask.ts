import { format } from "date-fns";
import { Task } from "../entities/task";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";

interface CreateTaskRequest {
  taskText: string;
}

export class CreateTask{
  constructor(
    private taskRepository : TaskRepository,
    private userRepository : UserRepository
  ){}

  public async execute({taskText} : CreateTaskRequest) : Promise<Task>{
    const createDate = format(new Date(), 'dd-MM-yyyy');
    const newTask = await this.taskRepository.create({text: taskText, createDate: createDate});
    return newTask;
  }
}