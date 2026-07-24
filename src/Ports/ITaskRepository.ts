import { Task } from "../Domain/Task.js";
import { TaskStatus } from "../Domain/TaskStatus.js";

export interface ITaskRepository {
    add(title: string, description: string, priority: number, dueDate: string): Promise<number>;
    all(): Promise<Task[]>;
    setStatus(id: number, status: TaskStatus): Promise<void>;
    remove(id: number): Promise<void>;
}
