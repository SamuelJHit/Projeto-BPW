import { Router, Request, Response } from 'express';
import { BankAccount } from '../models/account';

const bankRoutes = Router();

// Armazenamento em memória durante a execução
const contas: BankAccount[] = [];

// Abertura de Conta
bankRoutes.post('/abrir-conta', (req: Request, res: Response) => {
  try {
    const { nome, cpf, dataNascimento, email, senhaApp, senhaTransacao } = req.body;

    const novaConta = new BankAccount({
      nome,
      cpf,
      dataNascimento,
      email,
      senhaApp,
      senhaTransacao
    });

    contas.push(novaConta);

    return res.status(201).json({
      mensagem: 'Conta criada com sucesso!',
      conta: novaConta.getResumo()
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

// Cadastrar Chave Pix
bankRoutes.post('/cadastrar-pix', (req: Request, res: Response) => {
  const { contaId, chavePix } = req.body;

  const conta = contas.find(c => c.id === Number(contaId));
  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada' });
  }

  conta.cadastrarChavePix(chavePix);

  return res.json({
    mensagem: 'Chave Pix cadastrada com sucesso!',
    chavePix: conta.chavePix
  });
});

// Rota auxiliar para depositar saldo (necessária para conseguir testar transferências)
bankRoutes.post('/depositar', (req: Request, res: Response) => {
  try {
    const { contaId, valor } = req.body;
    const conta = contas.find(c => c.id === Number(contaId));

    if (!conta) return res.status(404).json({ erro: 'Conta não encontrada' });

    conta.depositar(Number(valor));

    return res.json({
      mensagem: 'Depósito realizado com sucesso!',
      saldoAtual: conta.getResumo().saldo
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

// Extrato e Saldo
bankRoutes.get('/extrato/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const conta = contas.find(c => c.id === id);

  if (!conta) {
    return res.status(404).json({ erro: 'Conta não encontrada.' });
  }

  return res.json(conta.getResumo());
});

// Transferência Pix
bankRoutes.post('/transferencia-pix', (req: Request, res: Response) => {
  try {
    const { contaOrigemId, chavePixDestino, valor, senhaTransacao } = req.body;

    const contaOrigem = contas.find(c => c.id === Number(contaOrigemId));
    if (!contaOrigem) {
      return res.status(404).json({ erro: 'Conta de origem não encontrada.' });
    }

    const contaDestino = contas.find(c => c.chavePix === chavePixDestino);
    if (!contaDestino) {
      return res.status(404).json({ erro: 'Chave Pix de destino não encontrada.' });
    }

    if (contaOrigem.id === contaDestino.id) {
      return res.status(400).json({ erro: 'Não é possível fazer Pix para a própria conta.' });
    }

    const valorNum = Number(valor);

    // Debita da conta de origem e credita na de destino
    contaOrigem.debitarPix(valorNum, senhaTransacao, contaDestino.nome);
    contaDestino.creditarPix(valorNum, contaOrigem.nome);

    return res.json({
      mensagem: 'Transferência Pix realizada com sucesso!',
      comprovante: {
        origem: contaOrigem.nome,
        destino: contaDestino.nome,
        valor: valorNum,
        data: new Date()
      }
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

export default bankRoutes;