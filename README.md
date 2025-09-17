# todo-api

A TypeScript Express API for managing an in-memory todo list. Includes validation with Zod, automated tests, and linting/formatting tooling.

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
npm install
npm run dev
```

The server runs on `http://localhost:3000` by default.

## Available Scripts

- `npm run dev` - start the API in watch mode using ts-node-dev
- `npm run build` - compile TypeScript to JavaScript in the `dist` directory
- `npm start` - run the compiled server from `dist`
- `npm test` - execute the Jest test suite

## API Endpoints

- `GET /health` - returns `{ "status": "ok" }`
- `GET /todos` - returns `{ "todos": Todo[] }`
- `POST /todos` - accepts `{ "text": string }` and returns `{ "todo": Todo }`

Todos are stored in memory for now and are reset when the process restarts.

## Docker

Build and run the project with Docker:

```bash
docker build -t todo-api .
docker run --rm -p 3000:3000 todo-api
```
