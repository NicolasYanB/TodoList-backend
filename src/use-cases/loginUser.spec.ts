import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { User } from "../entities/user";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { CreateUser } from "./createUser";
import { LoginUser } from "./loginUser";

describe('Login user', () => {
  let userRepository: InMemoryUserRepository;
  let loginUser: LoginUser;

  beforeAll(async () => {
    userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);
    await createUser.execute({
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890',
      username: 'nicolas.yan'
    });
  });

  beforeEach(async () => {
    loginUser = new LoginUser(userRepository);
  })

  it('Should login the user with the login', () => {
    const user = loginUser.execute({
      loginOrEmail: 'nicolas.yan',
      password: '1234567890'
    });

    expect(user).resolves.toBeInstanceOf(User);
  });

  it('Should login the user with the email', () => {
    const user = loginUser.execute({
      loginOrEmail: 'nicolas.yan@gmail.com',
      password: '1234567890'
    });

    expect(user).resolves.toBeInstanceOf(User);
  });

  it('Should not login the user with the wrong login/email', () => {
    expect(loginUser.execute({
      loginOrEmail: 'qwerty',
      password: '1234567890'
    })).rejects.toThrow();
  });

  it('Should not login the user with the wrong password', () => {
    expect(loginUser.execute({
      loginOrEmail: 'nicolas.yan',
      password: 'qwerty'
    })).rejects.toThrow();
  });
});