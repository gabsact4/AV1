"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Funcionario {
    constructor(id, funNome, telefone, endereco, usuario, senha, permicao) {
        this.id = id;
        this.funNome = funNome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.permicao = permicao;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.funNome;
    }
    getTelefone() {
        return this.telefone;
    }
    getEndereco() {
        return this.endereco;
    }
    getPermicao() {
        return this.permicao;
    }
}
exports.default = Funcionario;
