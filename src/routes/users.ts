import { Request, Response } from 'express';
import { Router } from "express";
import { User } from "../models/user";

const usersRoutes = Router()

usersRoutes.get('/', (request: Request, response: Response) => {
    response.json({
        message: 'Lista de usuários'
    });
});

export default usersRoutes;

const users: User[] = []
const user = new User('SamuelJ', 'samuelj@gmail.com', '123')

users.push(user)