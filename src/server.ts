import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import usersRoutes from './routes/users';
import { User } from './models/user';
import bankRoutes from './routes/bank'; // bank criado

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true }))
app.use(express.json());

app.get('/', (request: Request, response: Response) => {

  // retornar os dados da classe
  const user = new User('Samuel', 'samuelj@example.com', '123');

  console.log(user.verificarSenhaDigita('123'))

  response.json({
    message: 'Bem vindo á API de Usáarios',
    timestamp: new Date().toISOString(),
    status: 'API Funcionando'
  });
});

app.get('/users', (request: Request, response: Response) => {

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
// encaminhar para o bank
app.use('/v1/bank', 
  bankRoutes
)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});