import { ITaskRepository } from '../Ports/ITaskRepository.js';
import { Task } from '../Domain/Task.js';
import { TaskStatus } from '../Domain/TaskStatus.js';

export class TaskService {
  constructor(private readonly repo: ITaskRepository) {}

  public async create(
    title: string,
    description: string,
    priority: number,
    dueDate: string
  ): Promise<number> {
    if (!title.trim()) throw new Error('Title is empty');
    if (priority < 1 || priority > 5) throw new Error('Priority must be 1..5');
    return await this.repo.add(title, description, priority, dueDate);
  }

  public async all(): Promise<Task[]> {
    return await this.repo.all();
  }

  public async changeStatus(id: number, status: TaskStatus): Promise<void> {
    if (id <= 0) throw new Error('Bad id');
    await this.repo.setStatus(id, status);
  }

  public async remove(id: number): Promise<void> {
    if (id <= 0) throw new Error('Bad id');
    await this.repo.remove(id);
  }
}
