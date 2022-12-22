import { it, expect, describe, beforeEach } from 'vitest';
import { Task } from './task';
import { User } from './user';

describe('Create user', () => {
  let login: string;
  let password: string;

  beforeEach(() => {
    login = 'nicolas.yan';
    password = '1234567890';
  });

  it('Should create user', () => {
    const user = new User({
      id: 1,
      login,
      email: 'nicolas.yan@gmail.com',
      password,
      username: 'NicolasYanB',
    });
  
    expect(user).toBeInstanceOf(User);
  });
  
  it('Create user without username', () => {
    const user = new User({
      id: 2,
      login,
      email: 'nicolas.yan@gmail.com',
      password
    });
  
    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe(user.login);
  });

  it('Should not create user with invalid email', () => {
    expect(() => {
      return new User({
        id: 3,
        login,
        email: 'nicolas.yangmail.com',
        password,
      })
    }).toThrow();
  });
});