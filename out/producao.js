"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcionario_1 = __importDefault(require("./funcionario"));
class Producao extends funcionario_1.default {
    constructor(id, funNome, telefone, endereco, usuario, senha, permicao, prodNome, prazo, prodStatus) {
        super(id, funNome, telefone, endereco, usuario, senha, permicao);
        this.prodNome = prodNome;
        this.prazo = prazo;
        this.prodStatus = prodStatus;
    }
}
exports.default = Producao;
