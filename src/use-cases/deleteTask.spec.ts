import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/inMemoryRepositories/inMemoryTaskRepository";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { CreateTask } from "./createTask";
import { CreateUser } from "./createUser";
import { DeleteTask } from "./deleteTask";

describe('Delete task', () => {
  let deleteTask : DeleteTask;
  let createTask : CreateTask;
  let createUser : CreateUser;
  let taskRepository : TaskRepository;

  beforeAll(() => {
    taskRepository = new InMemoryTaskRepository();
    const userRepository = new InMemoryUserRepository();

    createTask = new CreateTask(taskRepository, userRepository);
    createUser = new CreateUser(userRepository);

    const userData = {
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567',
      username: 'nicolas.yan'
    };
    const taskData = {
      userId: 1,
      taskText: 'Fazer algo útil',
      taskCreateDate: '29-12-2022'
    };

    createUser.execute(userData);
    createTask.execute(taskData);
  });

  beforeEach(() => {
    deleteTask = new DeleteTask(taskRepository);
  });

  it('Should delete task', async () => {
    await deleteTask.execute({id: 1, userId: 1});
    expect(taskRepository.findById(1)).resolves.toBeNull();
  });

  it('Should not delete a task that was not created by the user', async () => {
    await createUser.execute({
      login: 'victor.samyr',
      email: 'victor.samyr@gmail.com',
      password: 'imgay24',
      username: 'nicolas.yan'
    });
    await createTask.execute({
      userId: 2,
      taskText: 'Fazer relatório'
    });

    expect(deleteTask.execute({id: 2, userId: 1})).rejects.toThrow();
  });

  it('Should not delete a task from a user that does not exists', () => {
    expect(deleteTask.execute({id: 2, userId: 3})).rejects.toThrow();
  });

  it('Should not delete a task that does not exists',() => {
    expect(deleteTask.execute({id: 3, userId: 1})).rejects.toThrow();
  });
})