import type { Request, Response, Application } from 'express';

import express from 'express';
import { PrismaClient } from '@prisma/client';

const app: Application = express();
const prisma = new PrismaClient();

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

