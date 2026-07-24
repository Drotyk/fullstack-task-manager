import pg from 'pg';
import { ITaskRepository } from '../Ports/ITaskRepository.js';
import { Task } from '../Domain/Task.js';
import { TaskStatus, taskStatusFromString } from '../Domain/TaskStatus.js';

export class PostgresTaskRepository implements ITaskRepository {
  private readonly pool: pg.Pool;

  constructor(connectionString: string) {
    this.pool = new pg.Pool({
      connectionString: connectionString
    });
  }

  public async init(): Promise<void> {
    await this.pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(120) NOT NULL,
                description TEXT DEFAULT '',
                status VARCHAR(20) NOT NULL,
                priority INTEGER NOT NULL,
                due_date VARCHAR(20) DEFAULT ''
            );
        `);
  }

  public async add(
    title: string,
    description: string,
    priority: number,
    dueDate: string
  ): Promise<number> {
    const res = await this.pool.query(
      'INSERT INTO tasks(title, description, status, priority, due_date) VALUES($1, $2, $3, $4, $5) RETURNING id',
      [title, description, TaskStatus.TODO, priority, dueDate]
    );
    return res.rows[0].id;
  }

  public async all(): Promise<Task[]> {
    const res = await this.pool.query('SELECT * FROM tasks ORDER BY id DESC');
    return res.rows.map(
      (r) =>
        new Task(
          r.id,
          r.title,
          r.description,
          taskStatusFromString(r.status),
          r.priority,
          r.due_date
        )
    );
  }

  public async setStatus(id: number, status: TaskStatus): Promise<void> {
    const res = await this.pool.query('UPDATE tasks SET status = $1 WHERE id = $2', [status, id]);
    if (res.rowCount === 0) throw new Error('Task not found');
  }

  public async remove(id: number): Promise<void> {
    const res = await this.pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    if (res.rowCount === 0) throw new Error('Task not found');
  }
}
