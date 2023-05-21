import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { CreateUser } from "../use-cases/createUser";
import { LoginUser } from "../use-cases/loginUser";

export class UserController {
    constructor (
        readonly userRepository : UserRepository
    ) {}

    async create(req : Request, res : Response) : Promise<void> {
        const body = req.body;
        const createUserData = {
            login: body.login,
            password: body.password,
            email: body.email,
            username: body.username
        };
        const createUser = new CreateUser(this.userRepository);
        const user = await createUser.execute(createUserData);
        res.json(user);
    }

    async login(req: Request, res: Response) : Promise<void> {
        const body = req.body;
        const loginUserData = {
            loginOrEmail: body.login,
            password: body.password
        };
        const loginUser = new LoginUser(this.userRepository);
        const loggedUser = loginUser.execute(loginUserData);
        res.json(loggedUser);
    }
}