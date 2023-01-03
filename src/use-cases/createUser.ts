import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { CreateUserDTO } from "../DTOs/createUserDTO";

type CreateUserResponse = User;

export class CreateUser {
  constructor(
    private userRepository: UserRepository
  ){}

  public async execute({login, email, password, username}: CreateUserDTO) : Promise<CreateUserResponse> {
    const user = {
      login,
      email,
      password,
      username
    };

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}