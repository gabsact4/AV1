import { TipoPeca, StatusPeca } from './enums';

export default class Peca {
    constructor(
        private nome: string,
        private tipo: TipoPeca,
        private fornecedor: string,
        private status: StatusPeca = StatusPeca.EM_PRODUCAO
    ) {}

    public getNome(): string {
        return this.nome;
    }

    public getTipo(): TipoPeca {
        return this.tipo;
    }

    public getFornecedor(): string {
        return this.fornecedor;
    }

    public getStatus(): StatusPeca {
        return this.status;
    }

    public setStatus(status: StatusPeca): void {
        this.status = status;
    }

    public registrarPeca(funcionario: any): boolean {
        return true; 
    }
}