import { v4 as uuidv4 } from 'uuid'

import { Task } from '../models/task-model';
import { PrismaClient } from '@prisma/client';

export class TasksRepository {
    private prisma: PrismaClient = new PrismaClient()

    public async listAll(): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany()
        return tasks
    }

    public async getById(id: number): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: { id: id }
        })
        return task
    }

    public async create(name: string): Promise<Task> {
        const task = await this.prisma.task.create({
            data: {
                name
            }
        })

        return task
    }

    public async findByName(name: string): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            where: { name: name }
        })

        return tasks
    }

    // src/repositories/tasks-repository.ts
public async findByName(name: string): Promise<Task | null> {
    const tasks = await this.prisma.task.findMany({
        where: { name: name },
        take: 1, // Garante que apenas uma tarefa seja retornada
    });

    return tasks.length > 0? tasks[0] : null;
}

public async create(name: string): Promise<Task> {
    const task = await this.prisma.task.create({
        data: {
            name,
            createdAt: new Date(), // Incluindo a data de criação automaticamente
        },
    });

    return task;
}

// src/repositories/tasks-repository.ts
public async update(id: number, name: string): Promise<Task | null> {
    const updatedTask = await this.prisma.task.update({
        where: { id: id },
        data: { name: name },
    });

    return updatedTask;
}

// src/repositories/tasks-repository.ts
public async delete(id: number): Promise<Task | null> {
    const deletedTask = await this.prisma.task.delete({
        where: { id: id },
    });

    return deletedTask;
}

}