import { isValid, parse } from "date-fns";
import { User } from "./user";

export interface TaskProps {
  id: number;
  text: string;
  createDate: string;
  finished: boolean;
  user: User
}

export class Task {
  constructor (
    readonly id : number,
    readonly text : string,
    readonly createDate : string,
    readonly finished : boolean
  ) {}
}