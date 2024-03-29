import { format } from "date-fns";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { InMemoryTaskRepository } from "../repositories/inMemoryRepositories/inMemoryTaskRepository";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";
import { CreateTask } from "./createTask";
import { CreateUser } from "./createUser";

describe('Create task', () => {
  let createTask: CreateTask;
  let userRepository: UserRepository;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    taskRepository = new InMemoryTaskRepository();
  });

  beforeEach(() => {
    createTask = new CreateTask(taskRepository, userRepository);
  });

  it('Should create a task', async () => {
    const createUser = new CreateUser(userRepository);
    const userInfo = {
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890',
      username: 'nicolas.yan'
    };
    await createUser.execute(userInfo);

    const newTask = await createTask.execute({
      taskText: 'Do something useful',
    });

    const allTasks = await taskRepository.findAll();
    expect(allTasks.length).toBe(1);
    expect(allTasks[0]).toBe(newTask);
  });

  it('Should put creation date automatically', async () => {
    await createTask.execute({
      taskText: 'Finish api'
    });

    const createdTask = await taskRepository.findById(1);
    expect(createdTask?.createDate).toEqual(expect.stringMatching(/\d\d-\d\d-\d\d\d\d/))
  });
});