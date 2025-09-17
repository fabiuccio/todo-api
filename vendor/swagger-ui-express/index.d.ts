import { RequestHandler } from 'express';

export interface SetupOptions {
  [key: string]: unknown;
}

export interface SwaggerUiExport {
  serve: RequestHandler[];
  setup: (swaggerDoc: unknown, options?: SetupOptions) => RequestHandler;
}

declare const swaggerUi: SwaggerUiExport;

export = swaggerUi;
