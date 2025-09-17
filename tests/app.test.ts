import request from 'supertest';
import { app } from '../src/app';
import { resetStore, getTodos } from '../src/store';

describe('todo api', () => {
  beforeEach(() => {
    resetStore();
  });

  it('returns ok status for health check', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns empty todo list initially', async () => {
    const response = await request(app).get('/todos');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ todos: [] });
  });

  it('creates a todo when text is provided', async () => {
    const createResponse = await request(app)
      .post('/todos')
      .send({ text: 'Buy milk' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.todo).toMatchObject({ text: 'Buy milk' });
    expect(typeof createResponse.body.todo.id).toBe('number');

    const listResponse = await request(app).get('/todos');
    expect(listResponse.body.todos).toHaveLength(1);
    expect(listResponse.body.todos[0]).toMatchObject({ text: 'Buy milk' });
  });

  it('rejects invalid payloads', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ text: '' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0]).toHaveProperty('message');
    expect(getTodos()).toHaveLength(0);
  });
});
