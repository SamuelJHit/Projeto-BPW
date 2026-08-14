import { Request, Response } from 'express'
import { Router } from "express"
import { User } from "../models/user"

const usersRoutes = Router()

const users: User[] = []
const user = new User('SamuelJ', 'samuelj@gmail.com', '123')

users.push(user)