# Task Manager

A simple Task Manager app with a REST API (Node.js + Express + TypeScript + MySQL) and a React SPA (TypeScript + Vite).

## Tech Stack & Libraries

**Backend**
- Express - REST API framework
- TypeScript - static typing
- mysql2 - MySQL database driver (raw parameterized queries, no ORM)
- Zod - request validation (body, query params)
- cors - enables cross-origin requests from the frontend (different dev port)
- dotenv - loads environment variables from `.env`
- ts-node / ts-node-dev — runs TypeScript directly with hot-reload during development (`npm run dev`)

**Frontend**
- React - UI library
- TypeScript - static typing
- Vite - build tool and dev server
- react-router-dom - client-side routing (list / create / edit pages)
- Native `fetch` - API calls (no extra HTTP client library needed)

## Project Structure

```
task-manager/
├── be/              # Backend (Express API)
├── fe/              # Frontend (React SPA)
├── database.sql     # Database creation script
└── README.md
```

## Setup & Run

### 1. Database
Run the SQL script against your local MySQL instance (via CLI or MySQL Workbench):
```bash
mysql -u root -p < database.sql
```
This creates the `task_manager` database and the `tasks` table.

### 2. Backend
```bash
cd be
npm install
```
Create a `.env` file (see `.env.example`):
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
PORT=3000
```
Run it:
```bash
npm run dev
```
API available at `http://localhost:3000`.

### 3. Frontend
```bash
cd fe
npm install
npm run dev
```
App available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint      | Description                  |
|--------|---------------|-------------------------------|
| GET    | /tasks        | List tasks                    |
| GET    | /tasks/:id    | Get a single task             |
| POST   | /tasks        | Create a task                 |
| PUT    | /tasks/:id    | Update a task                 |
| DELETE | /tasks/:id    | Delete a task                 |

Status values: `todo`, `in_progress`, `done`.

## Features

- Full CRUD for tasks
- Request validation with proper HTTP status codes (200, 201, 204, 400, 404, 500)
- Search by title, filter by status, sort by creation date
