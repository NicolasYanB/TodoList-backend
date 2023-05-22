import { Request, Response } from "express";
import { TaskRepository } from "../repositories/taskRepository";
import { UserRepository } from "../repositories/userRepository";
import { CreateTask } from "../use-cases/createTask";
import { DeleteTask } from "../use-cases/deleteTask";

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
        const task = await createTask.execute(createTaskData);
        res.json(task);
    }

    async delete(req : Request, res : Response) : Promise<void> {
        const body = req.body;
        const deleteTaskData = {
            id: body.id,
            userId: body.userID
        };
        const deleteTask = new DeleteTask(this.taskRepository);
        await deleteTask.execute(deleteTaskData);
        res.status(200).send();
    }
}