import { NivelPermissao } from './enums';

export default class Funcionario {
    constructor(
        private id: number,
        private nome: string,
        private usuario: string,
        private senha: string,
        private permissao: NivelPermissao
    ) {}

    public getId(): number {
        return this.id;
    }

    public getNome(): string {
        return this.nome;
    }

    public getPermissao(): NivelPermissao {
        return this.permissao;
    }

    public autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha;
    }
}