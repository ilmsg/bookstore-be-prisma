import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from './generated/prisma';
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, World!');
});

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
        },
    });
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});