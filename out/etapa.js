"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Etapa {
    constructor(nome, prazo) {
        this.responsavel = null;
        this.nome = nome;
        this.prazo = prazo;
        this.status = enums_1.StatusEtapa.PENDENTE;
    }
    associarFuncionario(funcionario) {
        this.responsavel = funcionario;
        console.log(`Funcionario ${funcionario.getNome()} associado à etapa ${this.nome}.`);
    }
    iniciarEtapa() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
            console.log(`Etapa '${this.nome}' iniciada.`);
        }
        else {
            console.log(`A Etapa '${this.nome}' já está em andamento ou concluída.`);
        }
    }
    finalizarEtapa() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
            console.log(`Etapa '${this.nome}' finalizada.`);
        }
        else {
            console.log(`Não é possível finalizar a Etapa '${this.nome}'. Ela não está em andamento.`);
        }
    }
}
exports.default = Etapa;
