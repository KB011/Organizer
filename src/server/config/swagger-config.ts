import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Organizer Backend API',
      version: '1.0.0',
      description: 'Enterprise-grade API documentation for Organizer application',
      contact: {
        name: 'Kaustav 😎',
        email: 'kaustav.std@gmail.com',
      },
    },
    servers: [
      {
        url: process.env.BASE_URL,
        description: 'Backend API server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);
export default swaggerSpec;
