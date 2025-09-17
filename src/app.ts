import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { z } from 'zod';
import { addTodo, getTodos } from './store';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Todo API',
    version: '1.0.0',
    description: 'API for managing todos'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ],
  components: {
    schemas: {
      Todo: {
        type: 'object',
        required: ['id', 'text'],
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          text: {
            type: 'string',
            example: 'Buy milk'
          }
        }
      },
      TodoList: {
        type: 'object',
        properties: {
          todos: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Todo'
            }
          }
        }
      },
      CreateTodoRequest: {
        type: 'object',
        required: ['text'],
        properties: {
          text: {
            type: 'string',
            example: 'Buy milk'
          }
        }
      },
      ValidationError: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                  example: 'text'
                },
                message: {
                  type: 'string',
                  example: 'text is required'
                }
              }
            }
          }
        }
      }
    }
  },
  paths: {
    '/health': {
      get: {
        summary: 'Check service health',
        tags: ['Health'],
        responses: {
          200: {
            description: 'Service is running',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/todos': {
      get: {
        summary: 'List todos',
        tags: ['Todos'],
        responses: {
          200: {
            description: 'List of todos',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TodoList'
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a todo',
        tags: ['Todos'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTodoRequest'
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Todo created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    todo: {
                      $ref: '#/components/schemas/Todo'
                    }
                  }
                }
              }
            }
          },
          400: {
            description: 'Validation error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ValidationError'
                }
              }
            }
          }
        }
      }
    }
  }
};

const swaggerSpec = swaggerJsdoc({ definition: swaggerDefinition, apis: [] });

const createTodoSchema = z.object({
  text: z.string().min(1, 'text is required')
});

export const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
