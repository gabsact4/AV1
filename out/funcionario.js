"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Funcionario {
    constructor(id, nome, telefone, endereco, usuario, senha, permissao) {
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.permissao = permissao;
    }
    getId() {
        return this.id;
    }
    getNome() {
        return this.nome;
    }
    getTelefone() {
        return this.telefone;
    }
    getEndereco() {
        return this.endereco;
    }
    getPermissao() {
        return this.permissao;
    }
    autenticar(usuario, senha) {
        return this.usuario === usuario && this.senha === senha;
    }
}
exports.default = Funcionario;
