export interface UserProps {
  id: number;
  login: string,
  email: string,
  password: string;
  username?: string;
}

export class User {
  private props: UserProps;
  
  public get id() : number {
    return this.props.id;
  }
  
  public get login() : string {
    return this.props.login;
  }
  
  public get email() : string {
    return this.props.email;
  }
  
  public set email(v : string) {
    if (!this.validateEmail(v)){
      throw new Error('Invalid email');
    }
    this.props.email = v;
  }
  
  public get password() : string {
    return this.props.password;
  }

  public set password(v : string) {
    this.props.password = v;
  }
  
  public get username() : string {
    if (!this.props.username){
      return this.props.login;
    }
    
    return this.props.username;
  }

  public set username(v : string) {
    this.props.username = v;
  }
  
  constructor(props: UserProps){
    const { email } = props;
    if (!this.validateEmail(email)){
      throw new Error('Invalid email');
    }

    this.props = props;
  }

  private validateEmail(email: string) : boolean{
    const regex = new RegExp('.+@.+\.com(\..+)?');
    return regex.test(email);
  }
}