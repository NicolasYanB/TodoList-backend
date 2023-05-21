export class User {
  constructor (
    readonly id : number,
    readonly login : string,
    readonly email : string,
    readonly password : string,
    readonly username : string
  ) {}
}