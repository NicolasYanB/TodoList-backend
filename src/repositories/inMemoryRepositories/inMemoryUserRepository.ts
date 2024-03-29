import { User } from "../../entities/user";
import { ChangeUserDataDTO } from "../../DTOs/changeUserDataDTO";
import { CreateUserDTO } from "../../DTOs/createUserDTO";
import { UserRepository } from "../userRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private sqUsers: number = 0;

  public async create({login, email, password, username}: CreateUserDTO): Promise<User> {
    this.sqUsers++;
    const user = new User(
      this.sqUsers,
      login,
      email,
      password,
      username
    );

    this.users.push(user);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: number) : Promise<User | null>{
    const user = this.users.find(elm => elm.id === id);
    return user ?? null;
  }

  public async findByLoginOrEmail(loginOrEmail: string): Promise<User | null> {
    const user = this.users.find(elm => elm.login === loginOrEmail || elm.email === loginOrEmail);
    return user ?? null;
  }

  public async deleteById(id: number): Promise<User> {
    const deletedUser = await this.findById(id);
    if (!deletedUser){
      throw new Error('Cannot delete a user that doesn\'t exists');
    }
    this.users = this.users.filter(user => user.id !== id);
    return deletedUser;
  }

  public async update({id, email, username, password}: ChangeUserDataDTO){
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User wasn\'t found');
    }
    email = email ?? user.email;
    username = username ?? user.username;
    password = password ?? user.password;
    const updatedUser = new User(user.id, user.login, email, password, username);
    this.users = this.users.map(t => t.id === user.id ? updatedUser : t);
    return updatedUser;
  }
}