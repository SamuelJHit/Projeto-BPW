import express, { Request, Response } from 'express';

import { User } from './models/user';

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true }))
app.use(express.json());

app.get('/', (Request: Request, response: Response) => {

  // retornar os dados da classe
  const user = new User('Samuel', 'samuelj@example.com', '123');

  console.log(user.verificarSenhaDigita('123'))

  response.json({
    message: 'Bem vindo á API de Usáarios',
    timestamp: new Date().toISOString(),
    status: 'API Funcionando'
  });
});

app.get('/users', (Request: Request, response: Response) => {

  // retornar os dados da classe
  const user = new User('Samuel', 'samuelj@example.com', '123');

  console.log(user.getDadosPublicos())

  console.log(user.verificarSenhaDigita('123'))

  response.json({
    message: 'Bem vindo á API de Usáarios',
    timestamp: new Date().toISOString(),
    user: user.getDadosPublicos(),
    status: 'API Funcionando'
  });

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});