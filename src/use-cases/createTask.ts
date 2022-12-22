import { Task } from "../entities/task";
import { User } from "../entities/user";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";

interface CreateTaskRequest {
  userId: number;
  taskText: string;
  taskCreateDate: string;
}

export interface CreateTaskDTO {
  user: User;
  text: string;
  createDate: string;
}

export class CreateTask{
  constructor(
    private taskRepository : TaskRepository,
    private userRepository : UserRepository
  ){}

  public async execute({userId, taskText, taskCreateDate} : CreateTaskRequest) : Promise<Task>{
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User wasn\'t found');
    }
    const newTask = await this.taskRepository.create({user, text: taskText, createDate: taskCreateDate});
    return newTask;
  }
}