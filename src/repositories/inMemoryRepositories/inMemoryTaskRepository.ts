import { Task } from "../../entities/task";
import { ChangeTaskDTO } from "../../DTOs/changeTaskDTO";
import { CreateTaskDTO } from "../../DTOs/createTaskDTO";
import { findTaskDTO, TaskRepository } from "../taskRepository";
import _ from 'lodash';

export class InMemoryTaskRepository implements TaskRepository {
  private tasks : Task[] = [];
  private sqTask = 0;

  public async create({text, createDate} : CreateTaskDTO) : Promise<Task>{
    const id = ++this.sqTask;
    const task = new Task(
      id,
      text,
      createDate,
      false
    );

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
        (!text || text === task.text) &&
        (!finished || finished === task.finished) &&
        (!createDate || createDate === task.createDate)
      );
    });
    return tasks;
  }

  public async update({id, text, finished} : ChangeTaskDTO) : Promise<Task> {
    const task = await this.findById(id);
    if (!task) {
      throw new Error('Task wasn\'t found');
    }
    text = text ?? task.text;
    finished = finished ?? task.finished;
    const newTask = new Task(
      id,
      text,
      task.createDate,
      finished
    );
    this.tasks = this.tasks.map(t => t.id === task.id ? newTask : t);
    return newTask;
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