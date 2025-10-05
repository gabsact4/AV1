"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Etapa {
    constructor(nome, prazo) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = enums_1.StatusEtapa.PENDENTE;
        this.funcionariosAssociados = [];
    }
    iniciarEtapa() {
        if (this.status === enums_1.StatusEtapa.PENDENTE) {
            this.status = enums_1.StatusEtapa.ANDAMENTO;
        }
    }
    finalizarEtapa() {
        if (this.status === enums_1.StatusEtapa.ANDAMENTO) {
            this.status = enums_1.StatusEtapa.CONCLUIDA;
        }
    }
    associarFuncionario(funcionario) {
        if (!this.funcionariosAssociados.includes(funcionario)) {
            this.funcionariosAssociados.push(funcionario);
            console.log(`Funcionário ${funcionario.getNome()} associado à etapa ${this.nome}`);
        }
        else {
            console.log(`Funcionário ${funcionario.getNome()} já está associado à etapa ${this.nome}`);
        }
    }
    removerFuncionario(funcionario) {
        const index = this.funcionariosAssociados.indexOf(funcionario);
        if (index > -1) {
            this.funcionariosAssociados.splice(index, 1);
            console.log(`Funcionário ${funcionario.getNome()} removido da etapa ${this.nome}`);
        }
    }
}
exports.default = Etapa;
