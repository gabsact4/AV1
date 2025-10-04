import Aeronave from "./nave";
import Etapa from "./etapa";
import Teste from "./teste";
import Peca from "./pecas";
import Funcionario from "./funcionario";

export default class Relatorio {
    constructor(
        private aeronave: Aeronave,
        private cliente: string,
        private dataEntrega: Date,
        private etapas: Etapa[],
        private testes: Teste[],
        private pecasUtilizadas: Peca[],
        private responsavel: Funcionario
    ) {}

    public gerarRelatorioCompleto() {
        console.log("--------------------- Relatório -------------------------------------\n");
        console.log(`Aeronave: ${this.aeronave.getDetalhes()}\n`);
        console.log(`Cliente: ${this.cliente}\n`);
        console.log(`Entrega: ${this.dataEntrega.toLocaleDateString()}\n`);
        console.log(`Responsável: ${this.responsavel.getNome()} (ID: ${this.responsavel.getId()})\n`);

        console.log("Etapas de Produção:");
        for (const etapa of this.etapas) {
            console.log(`${etapa.nome} Prazo: ${etapa.prazo} dias Status: ${etapa.status}\n`);
        }

        console.log("Peças Utilizadas:");
        for (const peca of this.pecasUtilizadas) {
            console.log(`${peca.getNome()} Tipo: ${peca.getTipo()} \n Fornecedor: ${peca.getFornecedor()} \n Status: ${peca.getStatus()}\n`);
        }

        console.log("Testes Realizados:");
        for (const teste of this.testes) {
            // CORREÇÃO: Usando getTipo() e getResultado()
            console.log(`Tipo: ${teste.getTipo()} Resultado: ${teste.getResultado()}\n`);
        }

        console.log(`Gerado em: ${new Date().toLocaleDateString()}`);
    }

    public getResumo(): string {
        return `Aeronave: ${this.aeronave.getDetalhes()}\n Cliente: ${this.cliente} \n Entrega: ${this.dataEntrega.toLocaleDateString()} \n ${this.etapas.length} etapas \n ${this.testes.length} testes`;
    }
}