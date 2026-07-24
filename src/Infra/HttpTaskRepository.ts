import { ITaskRepository } from "../Ports/ITaskRepository.js";
import { Task } from "../Domain/Task.js";
import { TaskStatus, taskStatusFromString } from "../Domain/TaskStatus.js";

export class HttpTaskRepository implements ITaskRepository {
    constructor(private readonly baseUrl: string) {}

    public async add(title: string, description: string, priority: number, dueDate: string): Promise<number> {
        const res = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, priority, dueDate })
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || 'Помилка додавання');
        }
        const data = await res.json();
        return data.id;
    }

    public async all(): Promise<Task[]> {
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error('Помилка завантаження');
        const rawTasks = await res.json();
        return rawTasks.map((t: any) => new Task(
            t.id,
            t.title,
            t.description,
            taskStatusFromString(t.status),
            t.priority,
            t.dueDate || t.due_date || ''
        ));
    }

    public async setStatus(id: number, status: TaskStatus): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || 'Помилка оновлення статусу');
        }
    }

    public async remove(id: number): Promise<void> {
        const res = await fetch(`${this.baseUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.error || 'Помилка видалення');
        }
    }
}
