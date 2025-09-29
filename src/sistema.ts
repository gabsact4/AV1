import Aeronave from './nave';
import Peca from './pecas';
import Etapa from './etapa';
import Funcionario from './funcionario';
import Teste from './teste';
import Relatorio from './relatorio';
import { TipoAeronave, TipoPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste } from './enums'; 

export default class SistemaProducao {
    private aeronave: Aeronave;
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    private testes: Teste[] = [];

    constructor(aeronave: Aeronave) {
        this.aeronave = aeronave;
    }

    public adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
        this.aeronave.adicionarPeca(peca);
        console.log(`Peça '${peca.getNome()}' adicionada ao sistema e à aeronave.`);
    }

    public adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
        this.aeronave.adicionarEtapa(etapa);
        console.log(`Etapa '${etapa.nome}' adicionada ao sistema e à aeronave.`);
    }

    public adicionarFuncionarioAEtapa(etapaNome: string, funcionario: Funcionario): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.associarFuncionario(funcionario);
        } else {
            console.log(`Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }

    public iniciarEtapa(etapaNome: string): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0 && this.etapas[index - 1].status !== StatusEtapa.CONCLUIDA) {
                console.log(`Não é possível iniciar a etapa '${etapa.nome}'. A etapa anterior precisa ser concluída primeiro.`);
            } else {
                etapa.iniciarEtapa();
            }
        } else {
            console.log(`Erro: Etapa '${etapaNome}' não encontrada.`);
        }
    }

    public finalizarEtapa(etapaNome: string): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.finalizarEtapa();
        } else {
            console.log(`Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }

    public realizarTeste(tipo: TipoTeste, resultado: ResultadoTeste): void {
        const novoTeste = new Teste(tipo, resultado);
        this.testes.push(novoTeste);
        this.aeronave.adicionarTeste(novoTeste);
        console.log(`Novo teste '${tipo}' realizado com resultado: ${resultado}.`);
    }

    public gerarRelatorioFinal(cliente: string, dataEntrega: Date, responsavel: Funcionario): void {
        const relatorio = new Relatorio(this.aeronave, cliente, dataEntrega, this.etapas, this.testes, this.pecas, responsavel);
        relatorio.gerarRelatorioCompleto();
    }
}