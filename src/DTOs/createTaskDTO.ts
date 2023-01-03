import { User } from "../entities/user";

export interface CreateTaskDTO {
  user: User;
  text: string;
  createDate: string;
}