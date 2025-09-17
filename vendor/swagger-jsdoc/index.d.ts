export interface SwaggerDefinition {
  [key: string]: unknown;
}

export interface SwaggerJSDocOptions {
  definition: SwaggerDefinition;
  apis?: string[];
}

export default function swaggerJsdoc(options: SwaggerJSDocOptions): SwaggerDefinition;
