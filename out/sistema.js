"use strict";
// sistema.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teste_1 = __importDefault(require("./teste"));
const relatorio_1 = __importDefault(require("./relatorio"));
const enums_1 = require("./enums");
class SistemaProducao {
    constructor(aeronave) {
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
        this.aeronave = aeronave;
    }
    // Método que recebe a peça E o funcionário que está adicionando.
    adicionarPeca(peca, funcionarioRegistro) {
        // Chama o método da Peca que verifica a permissão e registra os dados
        if (peca.registrarPeca(funcionarioRegistro)) {
            this.pecas.push(peca);
            this.aeronave.adicionarPeca(peca);
            console.log(`\n Peça '${peca.getNome()}' adicionada com sucesso ao sistema e à aeronave.`);
        }
        else {
            // Se o registro falhar devido à permissão, não adiciona ao sistema
            console.log(`\n Falha ao adicionar peça '${peca.getNome()}'. Verifique as permissões de registro.`);
        }
    }
    // ... (restante do código que não sofreu alterações)
    adicionarEtapa(etapa) {
        this.etapas.push(etapa);
        this.aeronave.adicionarEtapa(etapa);
        console.log(`\n Etapa '${etapa.nome}' adicionada ao sistema e à aeronave.`);
    }
    adicionarFuncionarioAEtapa(etapaNome, funcionario) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.associarFuncionario(funcionario);
        }
        else {
            console.log(`\n Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }
    iniciarEtapa(etapaNome) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0 && this.etapas[index - 1].status !== enums_1.StatusEtapa.CONCLUIDA) {
                console.log(`\n Não é possível iniciar a etapa '${etapa.nome}'. A etapa anterior precisa ser concluída primeiro.`);
            }
            else {
                etapa.iniciarEtapa();
            }
        }
        else {
            console.log(`\n Erro: Etapa '${etapaNome}' não encontrada.`);
        }
    }
    finalizarEtapa(etapaNome) {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.finalizarEtapa();
        }
        else {
            console.log(`Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }
    realizarTeste(tipo, resultado) {
        const novoTeste = new teste_1.default(tipo, resultado);
        this.testes.push(novoTeste);
        this.aeronave.adicionarTeste(novoTeste);
        console.log(`\n Novo teste '${tipo}' realizado com resultado: ${resultado}.`);
    }
    gerarRelatorioFinal(cliente, dataEntrega, responsavel) {
        const relatorio = new relatorio_1.default(this.aeronave, cliente, dataEntrega, this.etapas, this.testes, this.pecas, responsavel);
        relatorio.gerarRelatorioCompleto();
    }
}
exports.default = SistemaProducao;
