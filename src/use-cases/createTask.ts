import { format } from "date-fns";
import { Task } from "../entities/task";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";

interface CreateTaskRequest {
  userId: number;
  taskText: string;
}

export class CreateTask{
  constructor(
    private taskRepository : TaskRepository,
    private userRepository : UserRepository
  ){}

  public async execute({userId, taskText} : CreateTaskRequest) : Promise<Task>{
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User wasn\'t found');
    }
    const createDate = format(new Date(), 'dd-MM-yyyy');
    const newTask = await this.taskRepository.create({user, text: taskText, createDate: createDate});
    return newTask;
  }
}