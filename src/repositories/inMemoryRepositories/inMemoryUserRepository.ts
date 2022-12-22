import { User } from "../../entities/user";
import { ChangeUserDataDTO } from "../../use-cases/changeUserData";
import { CreateUserDTO } from "../../use-cases/createUser";
import { UserRepository } from "../userRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private sqUsers: number = 0;

  public async create({login, email, password, username}: CreateUserDTO): Promise<User> {
    const user = new User({
      id: ++this.sqUsers,
      login,
      email,
      password,
      username
    });

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
    user.email = email ?? user.email;
    user.username = username ?? user.username;
    user.password = password ?? user.password;
    return user;
  }
}