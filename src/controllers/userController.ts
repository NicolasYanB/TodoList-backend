import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepository";
import { CreateUser } from "../use-cases/createUser";

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
}