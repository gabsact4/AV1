import { StatusEtapa } from './enums';

export default class Etapa {
    public status: StatusEtapa = StatusEtapa.PENDENTE;
    public funcionariosAssociados: any[] = [];
    
    constructor(
        public nome: string,
        public prazo: number
    ) {}

    public iniciarEtapa(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
        }
    }

    public finalizarEtapa(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
        }
    }

    public associarFuncionario(funcionario: any): void {
        if (!this.funcionariosAssociados.includes(funcionario)) {
            this.funcionariosAssociados.push(funcionario);
            console.log(`Funcionário ${funcionario.getNome()} associado à etapa ${this.nome}`);
        } else {
            console.log(`Funcionário ${funcionario.getNome()} já está associado à etapa ${this.nome}`);
        }
    }

    public removerFuncionario(funcionario: any): void {
        const index = this.funcionariosAssociados.indexOf(funcionario);
        if (index > -1) {
            this.funcionariosAssociados.splice(index, 1);
            console.log(`Funcionário ${funcionario.getNome()} removido da etapa ${this.nome}`);
        }
    }
}