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
        var _a, _b;
        console.log("--------------------- Relatorio -------------------------------------\n");
        console.log(`Aeronave: ${this.aeronave.value}\n`);
        console.log(`Cliente: ${this.cliente}\n`);
        console.log(`Entrega: ${this.dataEntrega.toLocaleDateString()}\n`);
        console.log(`Responsável: ${this.responsavel.getNome()} (ID: ${this.responsavel.getId()})\n`);
        console.log("Etapas de Produção:");
        for (const p of this.etapas) {
            console.log(`${p.nome} Prazo: ${p.prazo} dias Status: ${p.status}\n`);
        }
        console.log("Peças Utilizadas:");
        for (const peca of this.pecasUtilizadas) {
            // Adicionado as novas informações de registro da peça
            const funcRegistro = ((_a = peca.getFuncionarioRegistro()) === null || _a === void 0 ? void 0 : _a.getNome()) || "N/A";
            const dataRegistro = ((_b = peca.getDataRegistro()) === null || _b === void 0 ? void 0 : _b.toLocaleDateString()) || "N/A";
            console.log(`
                ${peca.getNome()} Tipo: ${peca.getTipo()} 
                Fornecedor: ${peca.getFornecedor()} 
                Status: ${peca.getStatus()}
                Registrado por: ${funcRegistro} em: ${dataRegistro}
            `);
        }
        console.log("\nTestes Realizados:");
        for (const t of this.testes) {
            console.log(`Tipo: ${t.getTesteTipo()} Resultado: ${t.getResultado()}\n`);
        }
        console.log(`Gerado em: ${new Date().toLocaleDateString()}`);
    }
    getResumo() {
        return `Aeronave: ${this.aeronave.value}\n Cliente: ${this.cliente} \n Entrega: ${this.dataEntrega.toLocaleDateString()} \n ${this.etapas.length} \n etapas ${this.testes.length} testes`;
    }
}
exports.default = Relatorio;
