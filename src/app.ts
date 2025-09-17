import express from 'express';
import { z } from 'zod';
import { addTodo, getTodos } from './store';

const createTodoSchema = z.object({
  text: z.string().min(1, 'text is required')
});

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/todos', (_req, res) => {
  res.json({ todos: getTodos() });
});

app.post('/todos', (req, res) => {
  const parseResult = createTodoSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      errors: parseResult.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  const todo = addTodo(parseResult.data.text);

  return res.status(201).json({ todo });
});
