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
  private props: TaskProps;
  private _finishedDate: string;

  public get id() : number {
    return this.props.id;
  }  

  public get text() : string {
    return this.props.text;
  }
  
  public set text(v : string) {
    this.props.text = v;
  }
  
  public get createDate() : string {
    return this.props.createDate; 
  }
  
  public get finished() : boolean {
    return this.props.finished;
  }

  public set finished(v : boolean) {
    this.props.finished = v;
  }

  public get finishedDate() : string {
    return this._finishedDate;
  }

  public set finishedDate(v: string) {
    if (v === '') {
      this._finishedDate = v;
      return;
    }
    this.validDate(v);
    if (parse(v, 'dd-MM-yyyy', new Date()) < parse(this.createDate, 'dd-MM-yyyy', new Date())){
      throw new Error('Finish date cannot be lower than creation date');
    }
    this._finishedDate = v;
  }

  public get user() : User {
    return this.props.user;
  }

  public get userId() : number {
    return this.props.user.id;
  }
  
  constructor(props: TaskProps){
    const {finished, createDate} = props;

    if (finished){
      throw new Error('A task can only be initialized as unfinished');
    }

    this.validDate(createDate);

    this.props = props;
    this._finishedDate = '';
  }

  private validDate(dateStr: string){
    const date = parse(dateStr, 'dd-MM-yyyy', new Date());
    if (!isValid(date)){
      throw new Error('Invalid date format')
    }
    if (date > new Date()) {
      throw new Error('Invalid date value')
    }
  }
}