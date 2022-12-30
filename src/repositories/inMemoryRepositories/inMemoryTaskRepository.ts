import { Task } from "../../entities/task";
import { ChangeTaskDTO } from "../../use-cases/changeTask";
import { CreateTaskDTO } from "../../use-cases/createTask";
import { findTaskDTO, TaskRepository } from "../taskRepository";
import _ from 'lodash';

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

  public async findBy({id, userId, text, finished, createDate}: findTaskDTO) : Promise<Task[]> {
    const tasks = this.tasks.filter((task) => {
      return (
        (!id || id === task.id) &&
        (!userId || userId === task.userId) &&
        (!text || text === task.text) &&
        (!finished || finished === task.finished) &&
        (!createDate || createDate === task.createDate)
      );
    });
    return tasks;
  }

  public async update({id, userId, text, finished, finishedDate} : ChangeTaskDTO) : Promise<Task> {
    const tasks = await this.findBy({id, userId});
    if (tasks.length === 0) {
      throw new Error('Task wasn\'t found');
    }
    const [task] = tasks;
    task.text = text ?? task.text;
    task.finished = finished ?? task.finished;
    task.finishedDate = finishedDate ?? task.finishedDate;
    this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    return task;
  }

  public async deleteById(id: number) : Promise<Task> {
    const deletedTask = await this.findById(id);
    if (!deletedTask) {
      throw new Error('Cannot delete a task that does not exists');
    }
    this.tasks = this.tasks.filter(task => task.id !== id);
    return deletedTask;
  }
}