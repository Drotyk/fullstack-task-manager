import React, { useState, useEffect } from 'react';
import { Task } from './Domain/Task.js';
import { taskStatusFromString } from './Domain/TaskStatus.js';
import { useTaskService } from './App/TaskContext.js';

const getErrorMessage = (e: unknown): string => (e instanceof Error ? e.message : String(e));

const App: React.FC = () => {
  const taskService = useTaskService();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState('');

  const refreshTasks = async () => {
    try {
      const data = await taskService.all();
      setTasks(data);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await taskService.create(title, description, priority, dueDate);
      setTitle('');
      setDescription('');
      setPriority(3);
      setDueDate('');
      setError(null);
      await refreshTasks();
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const handleChangeStatus = async (id: number, statusStr: string) => {
    try {
      const status = taskStatusFromString(statusStr);
      await taskService.changeStatus(id, status);
      await refreshTasks();
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Видалити задачу?')) return;
    try {
      await taskService.remove(id);
      await refreshTasks();
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>Task Manager (Clean Architecture)</h1>
        <p className="muted">
          Fullstack demo: React Context → TaskService → HttpTaskRepository → Express
        </p>
      </header>

      {error && <div className="alert">{error}</div>}

      <section className="card">
        <h2>Додати задачу</h2>
        <form onSubmit={handleAdd} className="grid">
          <input
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            value={priority}
            onChange={(e) => setPriority(Number.parseInt(e.target.value))}
          />
          <textarea
            className="span2"
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <input
            placeholder="Дедлайн (YYYY-MM-DD)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="btn" type="submit">
            Додати
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Список задач</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>Пріоритет</th>
              <th>Назва</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.status}</td>
                <td>{t.priority}</td>
                <td>
                  <strong>{t.title}</strong>
                </td>
                <td className="actions">
                  <select
                    value={t.status}
                    onChange={(e) => handleChangeStatus(t.id, e.target.value)}
                  >
                    <option>TODO</option>
                    <option>DOING</option>
                    <option>DONE</option>
                  </select>
                  <button className="btn danger" onClick={() => handleDelete(t.id)}>
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default App;
