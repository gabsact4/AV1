"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
class Peca {
    constructor(PecasNome, PecasTipo, Fornecedro, Status = enums_1.StatusPeca.PRONTA, funcionarioRegistro = null, dataRegistro = null) {
        this.PecasNome = PecasNome;
        this.PecasTipo = PecasTipo;
        this.Fornecedro = Fornecedro;
        this.Status = Status;
        this.funcionarioRegistro = funcionarioRegistro;
        this.dataRegistro = dataRegistro;
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
    getFuncionarioRegistro() {
        return this.funcionarioRegistro;
    }
    getDataRegistro() {
        return this.dataRegistro;
    }
    registrarPeca(funcionario) {
        const permissao = funcionario.getPermicao();
        if (permissao === enums_1.NivelPermissao.ENGENHEIRO || permissao === enums_1.NivelPermissao.ADMINISTRADOR) {
            this.funcionarioRegistro = funcionario;
            this.dataRegistro = new Date();
            console.log(`\n Peça '${this.PecasNome}' registrada por ${funcionario.getNome()} em ${this.dataRegistro.toLocaleDateString()}.`);
            return true;
        }
        else {
            console.log(`\n Erro de Permissão: O funcionário ${funcionario.getNome()} (${permissao}) não tem permissão para registrar peças.`);
            return false;
        }
    }
}
exports.default = Peca;
