import { Task } from "../../entities/task";
import { ChangeTaskDTO } from "../../use-cases/changeTask";
import { CreateTaskDTO } from "../../use-cases/createTask";
import { findTaskDTO, TaskRepository } from "../taskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks : Task[] = [];
  private sqTask = 0;

  public async create({user, text, createDate} : CreateTaskDTO) : Promise<Task>{
    const task = new Task({
      id: ++this.sqTask,
      text,
      createDate,
      finished: false,
      user
    });

    this.tasks.push(task);
    return task;
  }

  public async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  public async findById(id: number) : Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id);
    return task ?? null;
  }

  public async findBy(findTask: findTaskDTO) : Promise<Task | null> {
    const {id, userId, text, finished, createDate} = findTask;
    const keys = Object.keys(findTask);
    const tasks = this.tasks.filter(task => {
    })
    const task = this.tasks.find(task => {
      return (
        (!task || task.id === id) && (!userId || task.user.id === userId) &&
        (!text || task.text === text) && (!finished || task.finished === finished) &&
        (!createDate || task.createDate === createDate)
      );
    });
    return task ?? null;
  }

  public async update({id, userId, text, finished} : ChangeTaskDTO) : Promise<Task> {
    const task = await this.findBy({id, userId});
    if (!task) {
      throw new Error('Task wasn\'t found');
    }
    task.text = text ?? task.text;
    task.finished = finished ?? task.finished;
    return task;
  }
}