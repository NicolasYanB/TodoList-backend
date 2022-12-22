import { describe, expect, it, test } from "vitest";
import { User } from "../entities/user";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { CreateUser } from "./createUser";

describe('Create user', () => {
  it('Should be able to create a user', () => {
    const userRepository = new InMemoryUserRepository();
    const createUser = new CreateUser(userRepository);

    expect(createUser.execute({
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890',
      username: 'NicolasYanB'
    })).resolves.toBeInstanceOf(User);

    expect(createUser.execute({
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890'
    })).resolves.toBeInstanceOf(User);
  });
});