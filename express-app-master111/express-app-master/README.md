# Task Manager

A simple full-stack Task Manager built with Express, MongoDB, EJS, TailwindCSS, and Passport.js.

## Features

- Register and login with username and password
- Logout
- Protected task pages
- Create, view, edit, and delete tasks
- REST API for tasks
- TailwindCSS styling

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- EJS
- TailwindCSS
- Passport.js local authentication

## Task Fields

- title
- description
- status
- priority
- dueDate
- createdBy

## API Routes

All API routes require login.

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| GET    | `/api/tasks/:id` | Get one task  |
| POST   | `/api/tasks`     | Create a task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Page Routes

| Route             | Description      |
| ----------------- | ---------------- |
| `/`               | Home page        |
| `/register`       | Register page    |
| `/login`          | Login page       |
| `/tasks`          | List tasks       |
| `/tasks/new`      | Create task form |
| `/tasks/:id`      | Task details     |
| `/tasks/:id/edit` | Edit task form   |

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

copy .env.example to .env

Build CSS:

```bash
npm run build:css
```

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```
