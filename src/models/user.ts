export class User {
    constructor (
        public nome: string,
        public email: string,
        private senha: string,
    ) { }

    verificarSenhaDigita(senhaDigitada:string): boolean {
        return this.senha === senhaDigitada
    }
}