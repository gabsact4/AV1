import Funcionario from "./funcionario";
import { StatusEtapa } from './enums';

export default class Etapa {
    public nome: string;
    public prazo: number;
    public status: StatusEtapa;
    private responsavel: Funcionario | null = null;

    constructor(nome: string, prazo: number) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = StatusEtapa.PENDENTE;
    }

    public associarFuncionario(funcionario: Funcionario): void {
        this.responsavel = funcionario;
        console.log(`Funcionario ${funcionario.getNome()} associado à etapa ${this.nome}.`);
    }

    public iniciarEtapa(): void {
        if (this.status === StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO;
            console.log(`Etapa '${this.nome}' iniciada.`);
        } else {
            console.log(`A Etapa '${this.nome}' já está em andamento ou concluída.`);
        }
    }

    public finalizarEtapa(): void {
        if (this.status === StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA;
            console.log(`Etapa '${this.nome}' finalizada.`);
        } else {
            console.log(`Não é possível finalizar a Etapa '${this.nome}'. Ela não está em andamento.`);
        }
    }
}