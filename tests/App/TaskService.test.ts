import { describe, it, expect, beforeEach } from 'vitest';
import { TaskService } from '../../src/App/TaskService.js';
import { ITaskRepository } from '../../src/Ports/ITaskRepository.js';
import { Task } from '../../src/Domain/Task.js';
import { TaskStatus } from '../../src/Domain/TaskStatus.js';

class MockTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  public async add(title: string, description: string, priority: number, dueDate: string): Promise<number> {
    const id = this.tasks.length + 1;
    this.tasks.push(new Task(id, title, description, TaskStatus.TODO, priority, dueDate));
    return id;
  }

  public async all(): Promise<Task[]> {
    return [...this.tasks];
  }

  public async setStatus(id: number, status: TaskStatus): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    (task as any).status = status;
  }

  public async remove(id: number): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService(new MockTaskRepository());
  });

  it('should create a task successfully when inputs are valid', async () => {
    const id = await service.create('Test task', 'Description', 3, '2026-12-31');
    expect(id).toBe(1);

    const tasks = await service.all();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test task');
    expect(tasks[0].priority).toBe(3);
  });

  it('should throw an error when title is empty', async () => {
    await expect(service.create('  ', 'Desc', 3, '')).rejects.toThrow('Title is empty');
  });

  it('should throw an error when priority is out of range 1..5', async () => {
    await expect(service.create('Task', 'Desc', 0, '')).rejects.toThrow('Priority must be 1..5');
    await expect(service.create('Task', 'Desc', 6, '')).rejects.toThrow('Priority must be 1..5');
  });

  it('should throw an error when changing status or removing with invalid ID', async () => {
    await expect(service.changeStatus(0, TaskStatus.DONE)).rejects.toThrow('Bad id');
    await expect(service.remove(-1)).rejects.toThrow('Bad id');
  });
});
