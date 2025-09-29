import Aeronave from "./nave";
import Etapa from "./etapa";
import Teste from "./teste";
import Peca from "./pecas";
import Funcionario from "./funcionario";

export default class Relatorio {
    private aeronave: Aeronave;
    private cliente: string;
    private dataEntrega: Date;
    private etapas: Etapa[];
    private testes: Teste[];
    private pecasUtilizadas: Peca[];
    private responsavel: Funcionario;

    constructor(
        aeronave: Aeronave,
        cliente: string,
        dataEntrega: Date,
        etapas: Etapa[],
        testes: Teste[],
        pecasUtilizadas: Peca[],
        responsavel: Funcionario
    ) {
        this.aeronave = aeronave;
        this.cliente = cliente;
        this.dataEntrega = dataEntrega;
        this.etapas = etapas;
        this.testes = testes;
        this.pecasUtilizadas = pecasUtilizadas;
        this.responsavel = responsavel;
    }

    public gerarRelatorioCompleto() {
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

    public getResumo(): string {
        return `Aeronave: ${this.aeronave.value} Cliente: ${this.cliente} Entrega: ${this.dataEntrega.toLocaleDateString()} ${this.etapas.length} etapas ${this.testes.length} testes`;
    }
}