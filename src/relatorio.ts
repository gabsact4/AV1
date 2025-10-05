import { writeFileSync } from 'fs';
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
        let conteudo = "--------------------- Relatório -------------------------------------\n";
        conteudo += `Aeronave: ${this.aeronave.getDetalhes()}\n`;
        conteudo += `Cliente: ${this.cliente}\n`;
        conteudo += `Entrega: ${this.dataEntrega.toLocaleDateString()}\n`;
        conteudo += `Responsável: ${this.responsavel.getNome()} (ID: ${this.responsavel.getId()})\n`;

        conteudo += "Etapas de Produção:\n";
        for (const etapa of this.etapas) {
            conteudo += `${etapa.nome} Prazo: ${etapa.prazo} dias Status: ${etapa.status}\n`;
        }

        conteudo += "Peças Utilizadas:\n";
        for (const peca of this.pecasUtilizadas) {
            conteudo += `${peca.getNome()} Tipo: ${peca.getTipo()} \n Fornecedor: ${peca.getFornecedor()} \n Status: ${peca.getStatus()}\n`;
        }

        conteudo += "Testes Realizados:\n";
        for (const teste of this.testes) {
            conteudo += `Tipo: ${teste.getTipo()} Resultado: ${teste.getResultado()}\n`;
        }

        conteudo += `Gerado em: ${new Date().toLocaleDateString()}`;

        const nomeArquivo = `relatorio_${this.cliente}_${new Date().getTime()}.txt`;
        writeFileSync(nomeArquivo, conteudo, 'utf8');
        console.log(`Relatório salvo como: ${nomeArquivo}`);
        
        console.log(conteudo);
    }

    public getResumo(): string {
        return `Aeronave: ${this.aeronave.getDetalhes()}\n Cliente: ${this.cliente} \n Entrega: ${this.dataEntrega.toLocaleDateString()} \n ${this.etapas.length} etapas \n ${this.testes.length} testes`;
    }
}