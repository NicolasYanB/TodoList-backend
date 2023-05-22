import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { UserRepository } from "../repositories/userRepository";
import { InMemoryUserRepository } from "../repositories/inMemoryRepositories/inMemoryUserRepository";
import { CreateUser } from "../use-cases/createUser";
import { DeleteUser } from "./deleteUser";
import { LoginUser } from "../use-cases/loginUser"

describe('Delete user', () => {
  let userRepository: UserRepository;
  let deleteUser: DeleteUser;

  beforeAll(() => {
    userRepository = new InMemoryUserRepository();
  });

  beforeEach(() => {
    const createUser = new CreateUser(userRepository);
    deleteUser = new DeleteUser(userRepository);
    const user = {
      login: 'nicolas.yan',
      email: 'nicolas.yan@gmail.com',
      password: '1234567890',
      username: 'nicolas.yan'
    };
    createUser.execute(user);
  });

  it('Should delete the user with the given login', async () => {
    const loginUser = new LoginUser(userRepository);
    const deletedUser = await userRepository.findByLoginOrEmail('nicolas.yan');
    if (deletedUser) {
      await deleteUser.execute(deletedUser.id);
    }
    expect(loginUser.execute({
      loginOrEmail: 'nicolas.yan',
      password: '1234567890'
    })).rejects.toThrow();
  });

  it('Should not be possible delete a user that doesn\'t exist', () => {
    expect(deleteUser.execute(3)).rejects.toThrow();
  });
});