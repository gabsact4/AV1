"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class Relatorio {
    constructor(aeronave, cliente, dataEntrega, etapas, testes, pecasUtilizadas, responsavel) {
        this.aeronave = aeronave;
        this.cliente = cliente;
        this.dataEntrega = dataEntrega;
        this.etapas = etapas;
        this.testes = testes;
        this.pecasUtilizadas = pecasUtilizadas;
        this.responsavel = responsavel;
    }
    gerarRelatorioCompleto() {
        let conteudo = "--------------------- Relatório -------------------------------------\n\n";
        conteudo += `Aeronave: ${this.aeronave.getDetalhes()}\n\n`;
        conteudo += `Cliente: ${this.cliente}\n\n`;
        conteudo += `Entrega: ${this.dataEntrega.toLocaleDateString()}\n\n`;
        conteudo += `Responsável: ${this.responsavel.getNome()} (ID: ${this.responsavel.getId()})\n\n`;
        conteudo += "Etapas de Produção:\n";
        for (const etapa of this.etapas) {
            conteudo += `${etapa.nome} Prazo: ${etapa.prazo} dias Status: ${etapa.status}\n\n`;
        }
        conteudo += "Peças Utilizadas:\n";
        for (const peca of this.pecasUtilizadas) {
            conteudo += `${peca.getNome()} Tipo: ${peca.getTipo()} \n Fornecedor: ${peca.getFornecedor()} \n Status: ${peca.getStatus()}\n\n`;
        }
        conteudo += "Testes Realizados:\n";
        for (const teste of this.testes) {
            conteudo += `Tipo: ${teste.getTipo()} Resultado: ${teste.getResultado()}\n\n`;
        }
        conteudo += `Gerado em: ${new Date().toLocaleDateString()}`;
        const nomeArquivo = `relatorio_${this.cliente}_${new Date().getTime()}.txt`;
        (0, fs_1.writeFileSync)(nomeArquivo, conteudo, 'utf8');
        console.log(`Relatório salvo como: ${nomeArquivo}`);
        console.log(conteudo);
    }
    getResumo() {
        return `Aeronave: ${this.aeronave.getDetalhes()}\n Cliente: ${this.cliente} \n Entrega: ${this.dataEntrega.toLocaleDateString()} \n ${this.etapas.length} etapas \n ${this.testes.length} testes`;
    }
}
exports.default = Relatorio;
