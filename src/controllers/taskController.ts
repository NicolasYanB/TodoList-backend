import { Request, Response } from "express";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";
import { CreateTask } from "../use-cases/createTask";

export class TaskController {
    constructor (
        readonly taskRepository : TaskRepository,
        readonly userRepository : UserRepository
    ) {}

    async create(req : Request, res : Response) : Promise<void> {
        const body = req.body;
        const createTaskData = {
            userId: body.userId,
            taskText: body.taskText
        };
        const createTask = new CreateTask(this.taskRepository, this.userRepository);
        const task = createTask.execute(createTaskData);
        res.json(task);
    }
}