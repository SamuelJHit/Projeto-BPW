import express, { Request, Response } from 'express';

import { User } from './models/user';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true }))
app.use(express.json());

app.get('/users', (req: Request, res: Response) => {

  // retornar os dados da classe
  const user = new User('Samuel', 'samuelj@example.com', '123');

  console.log(user)

  res.json({
    message: 'Bem vindo á API de Usáarios',
    timestamp: new Date().toISOString(),
    status: 'API Funcionando'
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});