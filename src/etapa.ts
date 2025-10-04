import { StatusEtapa } from './enums';

export default class Etapa {
    public status: StatusEtapa = StatusEtapa.PENDENTE;
    
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
        console.log(`Funcionário associado à etapa ${this.nome}`);
    }
}