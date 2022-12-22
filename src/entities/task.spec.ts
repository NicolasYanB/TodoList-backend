import { format } from "date-fns";
import { test, expect, describe, beforeEach, beforeAll, it } from "vitest";
import { getTomorrow } from "../tests/utils/getTomorrow";
import { Task } from "./task";
import { User } from "./user";

describe('Create task', () => {
  let text: string;
  let user: User;

  beforeAll(() => {
    user = new User({
      id: 1,
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890'
    });
  });

  beforeEach(() => {
    text = 'Terminar API';
  });

  test('Create task', () => {
    const task = new Task({
      id: 1,
      text,
      createDate: '08-12-2022',
      finished: false,
      user
    });
  
    expect(task).toBeInstanceOf(Task);
  });
  
  test('Cannot create a finished task', () => {
    expect(() => {
      return new Task({
        id: 2,
        text,
        createDate: '08-12-2022',
        finished: true,
        user
      })
    }).toThrow();
  });
  
  test('Cannot create task with create date after today', () => {
    const createDate = getTomorrow();
  
    expect(() => {
      return new Task({
        id: 3,
        text,
        createDate,
        finished: false,
        user
      })
    }).toThrow();
  });

  test('Cannot add a finish date before the creation date', () => {
    const creationDate = new Date();

    const task = new Task({
      id: 4,
      text,
      createDate: format(creationDate, 'dd-MM-yyyy'),
      finished: false,
      user
    });

    const yesterday = creationDate.setDate(creationDate.getDate() - 1);
    expect(() => {
      task.finishedDate = format(yesterday, 'dd-MM-yyyy');
    }).toThrow();
  })
});