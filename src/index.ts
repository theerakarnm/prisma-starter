import type { Request, Response, Application } from 'express';

import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const app: Application = express();
const prisma = new PrismaClient();

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', async (req: Request, res: Response) => {
  res.json({ msg: 'server is running' })
})

app.get('/users', async (req: Request, res: Response) => {
  try {

    const users = await prisma.user.findMany({
      include: {
        posts: true
      }
    })

    res.json(users);

  } catch (e) {
    console.error(e);

    res.sendStatus(500)
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {

    const { id } = req.params;

    const users = await prisma.user.findUnique({
      where: {
        id
      },
      include: {
        posts: true
      }
    })

    res.json(users);

  } catch (e) {
    console.error(e);

    res.sendStatus(500)
  }
});

app.post('/posts', async (req: Request, res: Response) => {
  try {

    const { author, postData }: {
      author: string,
      postData: {
        title: string,
        content: string
      }
    } = req.body;

    const post = await prisma.post.create({
      data: {
        ...postData,
        authorId: author
      }
    })

    res.json(post);

  } catch (e) {
    console.error(e);

    res.sendStatus(500)
  }
})

app.post('/users', async (req: Request, res: Response) => {
  try {

    const { data }: {
      data: {
        id: string,
        name: string,
        surname: string
      }
    } = req.body;

    const user = await prisma.user.create({ data })

    res.json(user);

  } catch (e) {
    console.error(e);

    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(400).json({ msg: 'User already exist' })
      }
    }

    res.sendStatus(500)
  }
})



// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

