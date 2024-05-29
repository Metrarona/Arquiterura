// src/services/update-task-service.ts
import { Task } from "../models/task-model";
import { TasksRepository } from "../repositories/tasks-repository";

export class UpdateTaskService {
    private readonly tasksRepository: TasksRepository;

    constructor() {
        this.tasksRepository = new TasksRepository();
    }

    public async exec(id: number, name: string): Promise<Task | null> {
        if (!id ||!name) {
            return null;
        }

        const task = await this.tasksRepository.getById(id);
        if (!task) {
            return null;
        }

        const updatedTask = await this.tasksRepository.update(id, name);
        return updatedTask;
    }
}