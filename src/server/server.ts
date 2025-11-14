import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { Server } from 'node:http';
import { gracefulShutdown, swaggerSpec } from '@server/config';
import { ReminderRouter } from '@server/routes';
import { globalErrorHandler } from '@server/middlewares';

dotenv.config();

const app: Application = express();
const PORT = process.env.BACKEND_PORT || 3005;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Swagger API Documentation
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'All OK!' });
});

app.use('/reminders', ReminderRouter);

app.use(globalErrorHandler);

const server: Server = app.listen(PORT, () =>
  console.log(`Express Server running at port: ${PORT}`)
);

// Handle server shutdown for local and remote environments
['SIGTERM', 'SIGINT'].forEach(signal => process.on(signal, () => gracefulShutdown(signal, server)));
