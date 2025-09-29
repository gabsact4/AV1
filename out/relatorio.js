"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        console.log("--------------------- Relatorio -------------------------------------");
        console.log(`Aeronave: ${this.aeronave.value}`);
        console.log(`Cliente: ${this.cliente}`);
        console.log(`Entrega: ${this.dataEntrega.toLocaleDateString()}`);
        console.log(`Responsável: ${this.responsavel.getNome()} (ID: ${this.responsavel.getId()})`);
        console.log("Etapas de Produção:");
        for (const p of this.etapas) {
            console.log(`${p.nome} Prazo: ${p.prazo} dias Status: ${p.status}`);
        }
        console.log("Peças Utilizadas:");
        for (const peca of this.pecasUtilizadas) {
            console.log(`${peca.getNome()} Tipo: ${peca.getTipo()} Fornecedor: ${peca.getFornecedor()} Status: ${peca.getStatus()}`);
        }
        console.log("Testes Realizados:");
        for (const t of this.testes) {
            console.log(`Tipo: ${t.getTesteTipo()} Resultado: ${t.getResultado()}`);
        }
        console.log(`Gerado em: ${new Date().toLocaleDateString()}`);
    }
    getResumo() {
        return `Aeronave: ${this.aeronave.value} Cliente: ${this.cliente} Entrega: ${this.dataEntrega.toLocaleDateString()} ${this.etapas.length} etapas ${this.testes.length} testes`;
    }
}
exports.default = Relatorio;
