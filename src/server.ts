import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Container } from './Core/Container.js';
import { PostgresTaskRepository } from './Infra/PostgresTaskRepository.js';
import { TaskService } from './App/TaskService.js';
import { taskStatusFromString } from './Domain/TaskStatus.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/taskdb';

const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : String(err);

// DI Setup
const container = new Container();
const repo = new PostgresTaskRepository(dbUrl);
await repo.init(); // Створення таблиць

container.set('TaskService', () => new TaskService(repo));

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(express.json());

// API Routes
app.get('/api/tasks', async (_req, res) => {
  try {
    const service = container.get<TaskService>('TaskService');
    const tasks = await service.all();
    res.json(tasks);
  } catch (err: unknown) {
    res.status(500).json({ error: getErrorMessage(err) });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const parsedPriority = Number.parseInt(priority, 10);
    const service = container.get<TaskService>('TaskService');
    const id = await service.create(title, description, parsedPriority, dueDate);
    res.status(201).json({ id });
  } catch (err: unknown) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const id = Number.parseInt(req.params.id, 10);
    const service = container.get<TaskService>('TaskService');
    await service.changeStatus(id, taskStatusFromString(status));
    res.sendStatus(204);
  } catch (err: unknown) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const service = container.get<TaskService>('TaskService');
    await service.remove(id);
    res.sendStatus(204);
  } catch (err: unknown) {
    res.status(400).json({ error: getErrorMessage(err) });
  }
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
