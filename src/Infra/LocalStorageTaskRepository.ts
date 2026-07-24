import { ITaskRepository } from "../Ports/ITaskRepository.js";
import { Task } from "../Domain/Task.js";
import { TaskStatus } from "../Domain/TaskStatus.js";

export class LocalStorageTaskRepository implements ITaskRepository {
    private readonly STORAGE_KEY = 'tasks_data';

    public async add(title: string, description: string, priority: number, dueDate: string): Promise<number> {
        const tasks = this.getAllFromStorage();
        const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        
        const newTask: Task = {
            id,
            title,
            description,
            status: TaskStatus.TODO,
            priority,
            dueDate
        };

        tasks.push(newTask);
        this.save(tasks);
        return id;
    }

    public async all(): Promise<Task[]> {
        return this.getAllFromStorage().sort((a, b) => b.id - a.id);
    }

    public async setStatus(id: number, status: TaskStatus): Promise<void> {
        const tasks = this.getAllFromStorage();
        const index = tasks.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Task not found");
        
        tasks[index] = { ...tasks[index], status };
        this.save(tasks);
    }

    public async remove(id: number): Promise<void> {
        const tasks = this.getAllFromStorage();
        const filtered = tasks.filter(t => t.id !== id);
        if (filtered.length === tasks.length) throw new Error("Task not found");
        
        this.save(filtered);
    }

    private getAllFromStorage(): Task[] {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    private save(tasks: Task[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
}
