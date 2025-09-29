"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    get value() {
        return `Codigo:${this.codigo}, Modelo: ${this.modelo}, Tipo: ${this.tipo}, Capacidade: ${this.capacidade}, Alcance: ${this.alcance}`;
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
    }
    adicionarEtapa(etapa) {
        this.etapas.push(etapa);
    }
    adicionarTeste(teste) {
        this.testes.push(teste);
    }
}
exports.default = Aeronave;
