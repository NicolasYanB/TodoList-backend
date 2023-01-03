import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import { LoginUserDTO } from "../DTOs/loginUserDTO";

type LoginUserResponse = User | null;

export class LoginUser {
  constructor(
    private userRepository: UserRepository
  ){}

  public async execute({loginOrEmail, password}: LoginUserDTO) : Promise<LoginUserResponse>{
    const user = await this.userRepository.findByLoginOrEmail(loginOrEmail);
    if (!user){
      throw new Error('User not found');
    }

    if (user.password !== password){
      throw new Error('Wrong password');
    }

    return user;
  }
}