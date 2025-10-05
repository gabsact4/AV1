"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    getDetalhes() {
        return `Código: ${this.codigo}, Modelo: ${this.modelo}, Tipo: ${this.tipo}, Capacidade: ${this.capacidade}, Alcance: ${this.alcance}`;
    }
    get value() {
        return this.getDetalhes();
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
    getPecas() {
        return this.pecas;
    }
    getEtapas() {
        return this.etapas;
    }
    getTestes() {
        return this.testes;
    }
}
exports.default = Aeronave;
