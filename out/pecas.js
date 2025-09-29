"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Peca {
    constructor(PecasNome, PecasTipo, Fornecedro, Status = "Disponível") {
        this.PecasNome = PecasNome;
        this.PecasTipo = PecasTipo;
        this.Fornecedro = Fornecedro;
        this.Status = Status;
    }
    getNome() {
        return this.PecasNome;
    }
    getTipo() {
        return this.PecasTipo;
    }
    getFornecedor() {
        return this.Fornecedro;
    }
    getStatus() {
        return this.Status;
    }
}
exports.default = Peca;
