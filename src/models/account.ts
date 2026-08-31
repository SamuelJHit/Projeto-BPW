export interface Transacao {
  tipo: 'PIX_ENVIADO' | 'PIX_RECEBIDO' | 'DEPOSITO_TESTE';
  valor: number;
  data: Date;
  destinoOuOrigem: string;
}

export class BankAccount {
  private static contadorConta = 1001;

  public id: number;
  public nome: string;
  public cpf: string;
  public dataNascimento: string;
  public email: string;
  public chavePix?: string;
  
  private saldo: number = 0;
  private senhaApp: string;
  private senhaTransacao: string;
  private extrato: Transacao[] = [];

  constructor(dados: {
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    senhaApp: string;
    senhaTransacao: string;
  }) {
    if (dados.senhaApp.length < 6) {
      throw new Error('A senha do app deve ter no mínimo 6 caracteres');
    }
    if (dados.senhaTransacao.length !== 4) {
      throw new Error('A senha de transação deve ter exatamente 4 dígitos');
    }

    this.id = BankAccount.contadorConta++;
    this.nome = dados.nome;
    this.cpf = dados.cpf;
    this.dataNascimento = dados.dataNascimento;
    this.email = dados.email;
    this.senhaApp = dados.senhaApp;
    this.senhaTransacao = dados.senhaTransacao;
  }

  public validarSenhaTransacao(senha: string): boolean {
    return this.senhaTransacao === senha;
  }

  public cadastrarChavePix(chave: string): void {
    this.chavePix = chave;
  }

  public depositar(valor: number): void {
    if (valor <= 0) throw new Error('O valor do depósito deve ser maior que zero');
    this.saldo += valor;
    this.extrato.push({
      tipo: 'PIX_RECEBIDO',
      valor,
      data: new Date(),
      destinoOuOrigem: 'Depósito Inicial / Teste'
    });
  }

  public creditarPix(valor: number, origem: string): void {
    this.saldo += valor;
    this.extrato.push({
      tipo: 'PIX_RECEBIDO',
      valor,
      data: new Date(),
      destinoOuOrigem: origem
    });
  }

  public debitarPix(valor: number, senha: string, destino: string): void {
    if (!this.validarSenhaTransacao(senha)) {
      throw new Error('Senha de transação incorreta');
    }
    if (valor <= 0) {
      throw new Error('O valor da transferência deve ser maior que zero');
    }
    if (this.saldo < valor) {
      throw new Error('Saldo insuficiente');
    }

    this.saldo -= valor;
    this.extrato.push({
      tipo: 'PIX_ENVIADO',
      valor,
      data: new Date(),
      destinoOuOrigem: destino
    });
  }

  public getResumo() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      cpf: this.cpf,
      chavePix: this.chavePix,
      saldo: this.saldo,
      extrato: this.extrato
    };
  }
}