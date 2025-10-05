"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Peca {
    constructor(nome, tipo, fornecedor, status = enums_1.StatusPeca.EM_PRODUCAO) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    getNome() {
        return this.nome;
    }
    getTipo() {
        return this.tipo;
    }
    getFornecedor() {
        return this.fornecedor;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    registrarPeca(funcionario) {
        return true;
    }
}
exports.default = Peca;
