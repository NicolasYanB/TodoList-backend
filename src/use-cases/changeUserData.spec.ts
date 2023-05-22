import { beforeAll, beforeEach, describe, expect, it, should } from "vitest";
import { User } from "../entities/user";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { UserRepository } from "../repositories/userRepository";
import { ChangeUserData } from "./changeUserData";
import { CreateUser } from "./createUser";

describe('Change user data', () => {
  let userRepository: UserRepository;
  let changeUserData: ChangeUserData;
  let userData: any;
  let user: User | null;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
    userData = {
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890'
    };
    const createUser = new CreateUser(userRepository);
    createUser.execute(userData);
  });

  beforeEach(async () => {
    changeUserData = new ChangeUserData(userRepository);
    user = await userRepository.findById(1);
    if (!user){throw new Error();}
  });

  it('Should change username', async () => {
    let newUsername = 'NicolasYanB';
    await changeUserData.execute({id: user!.id, username: newUsername});
    const changedUser = await userRepository.findById(1);
    expect(changedUser?.username).toBe(newUsername);
  });

  it('Should change email', async () => {
    let newEmail = 'nicolas.yanb@gmail.com';
    await changeUserData.execute({id: user!.id, email: newEmail});
    const changedUser = await userRepository.findById(1);
    expect(changedUser?.email).toBe(newEmail);
  });

  it('Should change password', async () => {
    let newPassword = '0987654321';
    await changeUserData.execute({id: user!.id, password: newPassword});
    const changedUser = await userRepository.findById(1);
    expect(changedUser?.password).toBe(newPassword);
  });

  it('Shouldn\'t change data of an user that doesn\'t exists', () => {
    expect(changeUserData.execute({id: 2, username: 'a'})).rejects.toThrow();
  });
});