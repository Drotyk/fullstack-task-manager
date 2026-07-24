# 📝 Task Manager Fullstack

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-yellow?logo=vitest)
![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-Formatter-F7B93E?logo=prettier)
![CI Pipeline](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions)

Сучасний веб-додаток для керування завданнями, побудований з акцентом на **Clean Architecture** та принципи **SOLID**. Проект демонструє ефективне поєднання React на фронтенді та Node.js з PostgreSQL на бекенді.

---

## ✨ Особливості

- **Повний CRUD**: Створення, перегляд, оновлення статусу та видалення завдань.
- **Чиста Архітектура**: Чіткий поділ на шари (Domain, Application, Infrastructure, Ports).
- **Dependency Injection**: Власний контейнер для керування залежностями.
- **Type Safety**: Повна підтримка TypeScript на обох кінцях стеку.
- **Юніт-тестування**: Тестування бізнес-логіки та доменних правил за допомогою Vitest.
- **Якість коду & CI**: Автоматичний лінтинг (ESLint), форматування (Prettier) та перевірка збірки у GitHub Actions.

## 🛠 Технологічний стек

| Складник | Технології |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Vanilla CSS |
| **Backend** | Node.js, Express, ts-node |
| **Database** | PostgreSQL, `pg` (node-postgres) |
| **Testing** | Vitest |
| **Code Quality & CI** | ESLint, Prettier, GitHub Actions |
| **Architectural Patterns** | Repository Pattern, Dependency Injection, DDD (elements) |

---

## 🏗 Архітектура проекту

Проект організований за принципами шаруватої архітектури:

- `src/Domain`: Ядро системи — сутності (`Task`) та бізнес-правила. Не залежить від фреймворків.
- `src/Ports`: Інтерфейси для зовнішніх систем (наприклад, `ITaskRepository`).
- `src/App`: Прикладний шар (`TaskService`, `TaskContext`) — оркестрація бізнес-логіки.
- `src/Infra`: Реалізація портів (`PostgresTaskRepository`, `HttpTaskRepository`, `LocalStorageTaskRepository`).
- `src/Core`: Допоміжні інструменти, як-от DI-контейнер.

---

## 🚀 Швидкий старт

### 1. Попередні вимоги
- Встановлений **Node.js** (v18+)
- Запущений сервер **PostgreSQL**

### 2. Налаштування бази даних
Створіть базу даних (наприклад, `taskdb`) у вашому PostgreSQL:
```sql
CREATE DATABASE taskdb;
```

### 3. Конфігурація середовища
Скопіюйте `.env.example` у `.env` у корені проекту та налаштуйте значення:
```env
PORT=3001
DATABASE_URL=postgresql://postgres:ВАШ_ПАРОЛЬ@localhost:5432/taskdb
VITE_API_URL=http://localhost:3001/api/tasks
```

### 4. Встановлення залежностей
```bash
npm install
```

### 5. Запуск для розробки (Development)
Вам знадобиться два термінали:

**Термінал 1 (Бекенд):**
```bash
npm run dev:backend
```

**Термінал 2 (Фронтенд):**
```bash
npm run dev:frontend
```

Додаток буде доступний за адресою: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Тестування, Лінтинг та Форматування

- **Запуск юніт-тестів (Vitest):**
  ```bash
  npm run test
  ```
- **Запуск лінтера (ESLint):**
  ```bash
  npm run lint
  ```
- **Форматування коду (Prettier):**
  ```bash
  npm run format
  ```

---

## 📦 Збірка та Production запуск

Збірка фронтенду (Vite) та бекенду (`tsconfig.server.json` -> `dist/server.js`):
```bash
npm run build
```
Запуск продакшн-сервера:
```bash
npm start
```

---

## 📂 Структура папок

```text
├── .github/workflows/ # GitHub Actions CI configuration
├── src/
│   ├── App/          # Application Layer (TaskService, TaskContext)
│   ├── Core/         # Framework-agnostic core tools (DI Container)
│   ├── Domain/       # Business Logic & Entities
│   ├── Infra/        # Data Access (Postgres, Http, LocalStorage)
│   ├── Ports/        # Interfaces (Abstractions)
│   ├── App.tsx       # UI Components
│   ├── server.ts     # Express Server entry point
│   └── main.tsx      # React entry point
├── tests/            # Vitest Unit Tests
├── public/           # Static assets
└── views/            # HTML templates
```

---
⭐ *Цей проект створений для демонстрації навичок архітектурного проектування та розробки fullstack додатків.*
