import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { Container } from './Core/Container.js';
import { HttpTaskRepository } from './Infra/HttpTaskRepository.js';
import { TaskService } from './App/TaskService.js';
import { TaskServiceProvider } from './App/TaskContext.js';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/tasks';

// 1. Ініціалізація DI Контейнера
const container = new Container();

container.set('TaskRepository', () => new HttpTaskRepository(apiUrl));
container.set('TaskService', (c) => new TaskService(c.get('TaskRepository')));

const taskService = container.get<TaskService>('TaskService');

// 2. Рендеринг додатка з TaskServiceProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaskServiceProvider service={taskService}>
      <App />
    </TaskServiceProvider>
  </React.StrictMode>
);
