import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/inMemoryRepositories/inMemoryTaskRepository";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";
import { ChangeTask } from "./changeTask";
import { CreateTask } from "./createTask";
import { CreateUser } from "./createUser";

describe('Change task information', () => {
  let changeTask: ChangeTask;
  let taskRepository: TaskRepository;
  let userRepository: UserRepository;

  beforeAll(() => {
    taskRepository = new InMemoryTaskRepository();
    userRepository = new InMemoryUserRepository();

    const createUser = new CreateUser(userRepository);
    const createTask = new CreateTask(taskRepository, userRepository);

    const userData = {
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890'
    };
    const taskData = {
      userId: 1,
      taskText: 'Fazer algo útil',
      taskCreateDate: '21-12-2022'
    };

    createUser.execute(userData);
    createTask.execute(taskData);
  });

  beforeEach(() => {
    changeTask = new ChangeTask(taskRepository);
  });

  it('Should change text', async () => {
    const newText = 'Ser útil';
    await changeTask.execute({
      id: 1,
      userId: 1,
      text: newText
    });
    const changedTask = await taskRepository.findById(1);
    expect(changedTask?.text).toBe(newText);
  });

  it('Should be able to change task state', async () => {
    await changeTask.execute({
      id: 1,
      userId: 1,
      finished: true
    });

    const changedTask = await taskRepository.findById(1);
    expect(changedTask?.finished).toBeTruthy();
  });

  it('Should not be able to create a task that wasn\'t created by the user', async () => {
    const createUser = new CreateUser(userRepository);
    const createTask = new CreateTask(taskRepository, userRepository);
    const userData = {
      login: 'victor.samyr',
      email: 'victor.samyr@gmail.com',
      password: 'estoraCu123'
    };
    const taskData = {
      userId: 2,
      taskText: 'Terminar API',
      taskCreateDate: '21-12-2022'
    };
    await createUser.execute(userData);
    await createTask.execute(taskData);

    expect(changeTask.execute({id: 2, userId: 1, text: ''})).rejects.toThrow();
  });

  it('Should be able to change a task that does not exists', () => {
    expect(changeTask.execute({id: 3, userId: 1, text: ''})).rejects.toThrow();
  });
});