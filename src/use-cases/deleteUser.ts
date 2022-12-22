import { UserRepository } from "../repositories/userRepository";

type DeleteUserResponse = string;

export class DeleteUser {
  constructor (
    private userRepository : UserRepository
  ){}

  public async execute(id: number) : Promise<DeleteUserResponse>{
    const deletedUser = await this.userRepository.deleteById(id);
    let response = `Usuário com login ${deletedUser.login} deletado com sucesso`;
    return response;
  }
}

