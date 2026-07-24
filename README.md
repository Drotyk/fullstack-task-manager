# Task Manager Fullstack

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-yellow?logo=vitest)
![ESLint](https://img.shields.io/badge/ESLint-Linter-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-Formatter-F7B93E?logo=prettier)
![CI Pipeline](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=githubactions)

Сучасний Fullstack веб-додаток для керування завданнями, розроблений із суворим дотриманням принципів **Clean Architecture** (Ports & Adapters) та **SOLID**. 

Проєкт демонструє побудову розширюваної системи з підтримкою різних джерел даних (PostgreSQL, LocalStorage, HTTP REST API), власного DI-контейнера, повного покриття юніт-тестами та автоматизованого CI/CD пайплайну.

---

## Ключові особливості

- **Повний CRUD-функціонал**: Створення, перегляд, зміна статусу (`TODO`, `DOING`, `DONE`) та видалення завдань.
- **Clean / Hexagonal Architecture**: Повний поділ на шари (Domain, Ports, Application, Infrastructure, UI).
- **Dependency Injection (DI)**: Власний легкий DI-контейнер (`Container.ts`) для керування залежностями на бекенді та фронтенді.
- **Взаємозамінність репозиторіїв**: Можливість гарячої заміни джерела даних (`PostgresTaskRepository`, `HttpTaskRepository`, `LocalStorageTaskRepository`) без зміни бізнес-логіки.
- **Full Type Safety**: 100% покриття TypeScript на всіх рівнях системи без використання `any`.
- **Автоматичне тестування та CI**: Юніт-тестування за допомогою **Vitest**, суворий лінтинг (**ESLint**), форматування (**Prettier**) та автоматична перевірка у **GitHub Actions**.

---

## Технологічний стек

| Шар / Компонент | Технології та інструменти |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Vanilla CSS, React Context |
| **Backend** | Node.js (ESM), Express, `pg` (node-postgres), dotenv, cors |
| **Database** | PostgreSQL |
| **Тестування** | Vitest |
| **Лінтер / Форматер** | ESLint v10 (Flat Config), Prettier |
| **CI / CD** | GitHub Actions Workflow (`ci.yml`) |
| **Архітектура** | Clean Architecture, Ports & Adapters, SOLID, Repository Pattern, DI |

---

## Архітектура та принципи SOLID

### Схема взаємодії шарів (Ports & Adapters)

```text
               +-------------------------------------------------------+
               |                    React UI (App.tsx)                  |
               +-------------------------------------------------------+
                                           |
                                (useTaskService Hook)
                                           v
               +-------------------------------------------------------+
               |            Application Layer (TaskService)             |
               +-------------------------------------------------------+
                                           |
                                  (ITaskRepository Port)
                                           v
     +-------------------------------------+-------------------------------------+
     |                                     |                                     |
     v                                     v                                     v
+-----------------------+     +-------------------------+     +-------------------------+
| HttpTaskRepository    |     | PostgresTaskRepository  |     | LocalStorageRepository  |
| (Frontend HTTP Fetch) |     | (Backend PostgreSQL)    |     | (Browser LocalStorage)  |
+-----------------------+     +-------------------------+     +-------------------------+
```

### Дотримання принципів SOLID

1. **Single Responsibility Principle (SRP)**:
   - `Task` містить лише доменні дані.
   - `TaskService` виконує лише бізнес-правила та валідацію.
   - `PostgresTaskRepository` відповідає виключно за SQL-запити.
   - `App.tsx` відповідає тільки за відображення інтерфейсу.
2. **Open/Closed Principle (OCP)**:
   - Додавання нового джерела даних (наприклад, MongoDB) вимагає лише створення нового адаптера `ITaskRepository` без модифікації бізнес-логіки `TaskService`.
3. **Liskov Substitution Principle (LSP)**:
   - `PostgresTaskRepository`, `HttpTaskRepository` та `LocalStorageTaskRepository` є повністю взаємозамінними під контролем протитипу `ITaskRepository`.
4. **Interface Segregation Principle (ISP)**:
   - Інтерфейс `ITaskRepository` містить мінімально необхідний набір методів (`add`, `all`, `setStatus`, `remove`).
5. **Dependency Inversion Principle (DIP)**:
   - `TaskService` залежить від абстракції `ITaskRepository`, а не від конкретної реалізації бази даних.

---

## Швидкий старт

### 1. Попередні вимоги
- **Node.js** (v18+)
- **PostgreSQL** сервер

### 2. Створення бази даних
```sql
CREATE DATABASE taskdb;
```

### 3. Налаштування змінних оточення
Скопіюйте `.env.example` у `.env` у корені проєкту:
```bash
cp .env.example .env
```
Вміст `.env`:
```env
PORT=3001
DATABASE_URL=postgresql://postgres:пароль@localhost:5432/taskdb
VITE_API_URL=http://localhost:3001/api/tasks
```

### 4. Встановлення залежностей
```bash
npm install
```

### 5. Запуск у режимі розробки (Development)

Потрібно запустити два термінали:

- **Terminal 1 (Бекенд Express):**
  ```bash
  npm run dev:backend
  ```
- **Terminal 2 (Фронтенд Vite):**
  ```bash
  npm run dev:frontend
  ```

Фронтенд буде доступний за адресою: [http://localhost:5173](http://localhost:5173)

---

## Тестування, Лінтинг та Форматування

| Команда | Опис |
| :--- | :--- |
| `npm run test` | Запуск юніт-тестів Vitest |
| `npm run test:watch` | Інтерактивний режим автоперезапуску тестів |
| `npm run lint` | Перевірка коду за допомогою ESLint |
| `npm run format` | Автоматичне форматування коду Prettier |
| `npm run format:check` | Перевірка дотримання правил Prettier |

---

## Production Збірка та Запуск

Проєкт має розділені конфігурації збірки фронтенду (`vite build`) та бекенду (`tsconfig.server.json` -> `dist/server.js`):

```bash
# Збірка обох частин проєкту
npm run build

# Запуск продакшн Node.js сервера
npm start
```

---

## Структура проєкту

```text
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated GitHub Actions Pipeline
├── src/
│   ├── App/
│   │   ├── TaskContext.tsx      # React Context Provider & useTaskService Hook
│   │   └── TaskService.ts       # Application Business Logic Layer
│   ├── Core/
│   │   └── Container.ts         # Lightweight Dependency Injection Container
│   ├── Domain/
│   │   ├── Task.ts              # Task Domain Entity
│   │   └── TaskStatus.ts        # Task Status Enum & Helpers
│   ├── Infra/
│   │   ├── HttpTaskRepository.ts       # Frontend HTTP Fetch Repository Adapter
│   │   ├── LocalStorageTaskRepository.ts # Frontend LocalStorage Repository Adapter
│   │   └── PostgresTaskRepository.ts   # Backend PostgreSQL Repository Adapter
│   ├── Ports/
│   │   └── ITaskRepository.ts   # Repository Abstraction (Port)
│   ├── App.tsx                  # Main React Component (UI Layer)
│   ├── server.ts                # Backend Express Server Entry Point
│   ├── main.tsx                 # Frontend React Entry Point (DI Init)
│   └── vite-env.d.ts            # Vite TypeScript Declarations
├── tests/
│   ├── App/
│   │   └── TaskService.test.ts  # Unit tests for TaskService logic
│   └── Domain/
│       └── TaskStatus.test.ts   # Unit tests for TaskStatus domain rules
├── .env.example                 # Environment variables template
├── eslint.config.js             # ESLint Flat Configuration
├── Makefile                     # Automation tasks
├── tsconfig.json                # Frontend TypeScript Configuration
├── tsconfig.server.json         # Backend Node.js TypeScript Configuration
└── vitest.config.ts             # Vitest Configuration
```

---

*Цей проєкт створений для демонстрації практичного застосування Clean Architecture, SOLID та сучасних Fullstack підходів на TypeScript.*
