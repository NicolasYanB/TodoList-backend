import { User } from "../entities/user";
import { ChangeUserDataDTO } from "../DTOs/changeUserDataDTO";
import { CreateUserDTO } from "../DTOs/createUserDTO";

export interface UserRepository {
  create(user: CreateUserDTO): Promise<User>;
  findAll() : Promise<User[]>;
  findByLoginOrEmail(loginOrEmail: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  deleteById(id: number): Promise<User>;
  update(changes: ChangeUserDataDTO) : Promise<User>;
}