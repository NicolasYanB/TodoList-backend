import { UserRepository } from "../repositories/userRepository";
import { ChangeUserDataDTO } from "../DTOs/changeUserDataDTO";

export class ChangeUserData {
  constructor(
    private userRepository: UserRepository
  ){}

  public async execute(changes : ChangeUserDataDTO) : Promise<void>{
    await this.userRepository.update(changes);
  }
}