# Client Requests Dashboard

A simple full-stack internal dashboard for managing client requests.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Node.js + Express
- TypeScript
- Prisma
- SQLite

## Project Structure

```text
Task 1/
├── frontend/
└── backend/

## Backend Setup

```bash
cd backend
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Run the database migration:

```bash
npx prisma migrate deploy
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```
