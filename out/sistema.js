"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const funcionario_1 = __importDefault(require("./funcionario"));
const teste_1 = __importDefault(require("./teste"));
const relatorio_1 = __importDefault(require("./relatorio"));
const persistencia_1 = require("./persistencia");
const enums_1 = require("./enums");
class SistemaProducao {
    constructor() {
        this.aeronaves = [];
        this.pecas = [];
        this.etapas = [];
        this.funcionarios = [
            new funcionario_1.default(1, "Admin", "11999999999", "Endereço Admin", "admin", "123", enums_1.NivelPermissao.ADMINISTRADOR)
        ];
        this.testes = [];
        persistencia_1.Persistencia.carregarDados(this);
    }
    login(usuario, senha) {
        const funcionario = this.funcionarios.find(f => f.autenticar(usuario, senha));
        return funcionario !== undefined;
    }
    adicionarAeronave(aeronave) {
        const existe = this.aeronaves.find(a => {
            const aDetalhes = a.codigo;
            const aeronaveDetalhes = aeronave.codigo;
            return aDetalhes === aeronaveDetalhes;
        });
        if (existe) {
            console.log("Erro: Já existe uma aeronave com esse código.");
            return;
        }
        this.aeronaves.push(aeronave);
        console.log("Aeronave cadastrada com sucesso!");
    }
    adicionarPeca(peca) {
        this.pecas.push(peca);
        console.log("Peça cadastrada com sucesso!");
    }
    adicionarEtapa(etapa) {
        const existe = this.etapas.find(e => e.nome === etapa.nome);
        if (existe) {
            console.log("Erro: Já existe uma etapa com esse nome.");
            return;
        }
        this.etapas.push(etapa);
        console.log("Etapa cadastrada com sucesso!");
    }
    adicionarFuncionario(funcionario) {
        const existeId = this.funcionarios.find(f => f.getId() === funcionario.getId());
        if (existeId) {
            console.log("Erro: Já existe um funcionário com esse ID.");
            return;
        }
        this.funcionarios.push(funcionario);
        console.log(`Funcionário ${funcionario.getNome()} cadastrado com sucesso!`);
    }
    getAeronaves() {
        return this.aeronaves;
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
    getFuncionarios() {
        return this.funcionarios;
    }
    atualizarStatusPeca(nomePeca, novoStatus) {
        const peca = this.pecas.find(p => p.getNome() === nomePeca);
        if (peca) {
            peca.setStatus(novoStatus);
            console.log(`Status da peça '${nomePeca}' atualizado para '${novoStatus}'.`);
        }
        else {
            console.log(`Peça '${nomePeca}' não encontrada.`);
        }
    }
    adicionarPecaComPermissao(peca, funcionarioRegistro) {
        if (funcionarioRegistro.getPermissao() === enums_1.NivelPermissao.ADMINISTRADOR ||
            funcionarioRegistro.getPermissao() === enums_1.NivelPermissao.ENGENHEIRO) {
            this.pecas.push(peca);
            console.log(`\n Peça '${peca.getNome()}' adicionada com sucesso ao sistema.`);
        }
        else {
            console.log(`\n Falha ao adicionar peça '${peca.getNome()}'. Permissão insuficiente.`);
        }
    }
    adicionarFuncionarioAEtapa(etapaNome, funcionario) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.associarFuncionario(funcionario);
            console.log(`Funcionário ${funcionario.getNome()} associado à etapa ${etapaNome}`);
        }
        else {
            console.log(`\n Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }
    iniciarEtapa(etapaNome) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0) {
                const etapaAnterior = this.etapas[index - 1];
                if (etapaAnterior.status !== enums_1.StatusEtapa.CONCLUIDA) {
                    console.log(`Atenção: A etapa anterior '${etapaAnterior.nome}' não está concluída.`);
                }
            }
            etapa.iniciarEtapa();
            console.log(`Etapa '${etapaNome}' iniciada com sucesso!`);
        }
        else {
            console.log(`\n Erro: Etapa '${etapaNome}' não encontrada.`);
        }
    }
    finalizarEtapa(etapaNome) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0) {
                const etapaAnterior = this.etapas[index - 1];
                if (etapaAnterior.status !== enums_1.StatusEtapa.CONCLUIDA) {
                    console.log(`Atenção: A etapa anterior '${etapaAnterior.nome}' não está concluída.`);
                }
            }
            etapa.finalizarEtapa();
            console.log(`Etapa '${etapaNome}' finalizada com sucesso!`);
        }
        else {
            console.log(`Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }
    realizarTeste(tipo, resultado, aeronave) {
        const novoTeste = new teste_1.default(tipo, resultado);
        this.testes.push(novoTeste);
        if (aeronave) {
            aeronave.adicionarTeste(novoTeste);
        }
        console.log(`\n Novo teste '${tipo}' realizado com resultado: ${resultado}.`);
    }
    salvarDados() {
        persistencia_1.Persistencia.salvarDados(this);
    }
    gerarRelatorioFinal(cliente, dataEntrega, responsavel, aeronave) {
        const relatorio = new relatorio_1.default(aeronave, cliente, dataEntrega, this.etapas, this.testes, this.pecas, responsavel);
        relatorio.gerarRelatorioCompleto();
    }
}
exports.default = SistemaProducao;
