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

  public async findBy(findTask: findTaskDTO) : Promise<Task[]> {
    const keys = Object.keys(findTask);
    const tasks = this.tasks.filter(task => {
      const taskSubset = _.pick(task, keys);
      return _.isEqual(taskSubset, findTask);
    });
    return tasks;
  }

  public async update(changes : ChangeTaskDTO) : Promise<Task> {
    const { id, userId, ...changesInfo } = changes;
    const tasks = await this.findBy({id, userId});
    if (tasks.length === 0) {
      throw new Error('Task wasn\'t found');
    }
    const [task] = tasks;
    for (const key in changesInfo){
      task[key] = changes[key];
    }
    return task;
  }
}