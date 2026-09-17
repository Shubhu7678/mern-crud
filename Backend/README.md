# Task API

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGO_URI`.
3. Start MongoDB, then run `npm run dev`.

## Endpoints

- `POST /api/tasks` with `{ "title": "Buy groceries" }`
- `GET /api/tasks`
- `PATCH /api/tasks/:id/toggle`
- `DELETE /api/tasks/:id`
- `GET /api/health`