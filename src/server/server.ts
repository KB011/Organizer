import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Server } from 'node:http';
import { gracefulShutdown, prisma } from '@server/config';

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

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'All OK!' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const server: Server = app.listen(PORT, () =>
  console.log(`Express Server running at port: ${PORT}`)
);

// Handle server shutdown for local and remote environments
['SIGTERM', 'SIGINT'].forEach(signal => process.on(signal, () => gracefulShutdown(signal, server)));
