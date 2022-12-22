import { UserRepository } from "../repositories/userRepository";

export interface ChangeUserDataDTO {
  id: number;
  email?: string;
  username?: string;
  password?: string;
}

export class ChangeUserData {
  constructor(
    private userRepository: UserRepository
  ){}

  public async execute(changes : ChangeUserDataDTO) : Promise<void>{
    await this.userRepository.update(changes);
  }
}