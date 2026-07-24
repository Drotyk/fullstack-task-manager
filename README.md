# 📝 Task Manager Fullstack

Сучасний веб-додаток для керування завданнями, побудований з акцентом на **Clean Architecture** та принципи **SOLID**. Проект демонструє ефективне поєднання React на фронтенді та Node.js з PostgreSQL на бекенді.

---

## ✨ Особливості

- **Повний CRUD**: Створення, перегляд, оновлення статусу та видалення завдань.
- **Чиста Архітектура**: Чіткий поділ на шари (Domain, Application, Infrastructure, Ports).
- **Dependency Injection**: Власний контейнер для керування залежностями.
- **Type Safety**: Повна підтримка TypeScript на обох кінцях стеку.
- **Modern UI**: Мінімалістичний та адаптивний інтерфейс на Vanilla CSS.

## 🛠 Технологічний стек

| Складник | Технології |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript |
| **Backend** | Node.js, Express, ts-node |
| **Database** | PostgreSQL, `pg` (node-postgres) |
| **Architectural Patterns** | Repository Pattern, Dependency Injection, Domain Driven Design (elements) |

---

## 🏗 Архітектура проекту

Проект організований за принципами шаруватої архітектури:

- `src/Domain`: Ядро системи — сутності (`Task`) та бізнес-правила. Не залежить від фреймворків.
- `src/Ports`: Інтерфейси для зовнішніх систем (наприклад, `ITaskRepository`).
- `src/App`: Прикладний шар (Service) — оркестрація бізнес-логіки.
- `src/Infra`: Реалізація портів (робота з БД, LocalStorage тощо).
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

### 6. Збірка та Production запуск
Збірка фронтенду (Vite) та бекенду (`tsconfig.server.json` -> `dist/server.js`):
```bash
npm run build
```
Запуск продакшн-сервера:
```bash
npm start
```

## 📂 Структура папок

```text
├── src/
│   ├── App/          # Application Layer (Services)
│   ├── Core/         # Framework-agnostic core tools (DI Container)
│   ├── Domain/       # Business Logic & Entities
│   ├── Infra/        # Data Access & Implementation
│   ├── Ports/        # Interfaces (Abstractions)
│   ├── App.tsx       # UI Components
│   ├── server.ts     # Express Server entry point
│   └── main.tsx      # React entry point
├── public/           # Static assets
└── views/            # HTML templates
```

## ⚠️ Розгортання (Deployment)

Цей проект використовує повноцінний бекенд та базу даних. Для деплою рекомендується:
- **Frontend**: Vercel, Netlify або Cloudflare Pages.
- **Backend**: Render, Railway або Fly.io.
- **Database**: Managed PostgreSQL на Railway або Supabase.

---
⭐ *Цей проект створений для демонстрації навичок архітектурного проектування та розробки fullstack додатків.*
