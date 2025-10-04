import Aeronave from './nave';
import Peca from './pecas';
import Etapa from './etapa';
import Funcionario from './funcionario';
import Teste from './teste';
import Relatorio from './relatorio';
import { TipoAeronave, TipoPeca, StatusEtapa, StatusPeca, NivelPermissao, TipoTeste, ResultadoTeste } from './enums'; 

export default class SistemaProducao {
    private aeronaves: Aeronave[] = [];
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    private funcionarios: Funcionario[] = [
        new Funcionario(1, "Admin", "admin", "123", NivelPermissao.ADMINISTRADOR)
    ];

    constructor() {
    }

    public login(usuario: string, senha: string): boolean {
        const funcionario = this.funcionarios.find(f => 
            f.autenticar(usuario, senha)
        );
        return funcionario !== undefined;
    }

    public adicionarAeronave(aeronave: Aeronave): void {
        this.aeronaves.push(aeronave);
    }

    public adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
    }

    public adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
    }

    public getAeronaves(): Aeronave[] {
        return this.aeronaves;
    }

    public getPecas(): Peca[] {
        return this.pecas;
    }

    public getEtapas(): Etapa[] {
        return this.etapas;
    }

    public atualizarStatusPeca(nomePeca: string, novoStatus: StatusPeca): void {
        const peca = this.pecas.find(p => p.getNome() === nomePeca);
        if (peca) {
            peca.setStatus(novoStatus);
            console.log(`Status da peça '${nomePeca}' atualizado para '${novoStatus}'.`);
        } else {
            console.log(`Peça '${nomePeca}' não encontrada.`);
        }
    }

    public adicionarPecaComPermissao(peca: Peca, funcionarioRegistro: Funcionario): void {
        if (funcionarioRegistro.getPermissao() === NivelPermissao.ADMINISTRADOR || 
            funcionarioRegistro.getPermissao() === NivelPermissao.ENGENHEIRO) {
            this.pecas.push(peca);
            console.log(`\n Peça '${peca.getNome()}' adicionada com sucesso ao sistema.`);
        } else {
            console.log(`\n Falha ao adicionar peça '${peca.getNome()}'. Permissão insuficiente.`);
        }
    }

    public adicionarFuncionarioAEtapa(etapaNome: string, funcionario: Funcionario): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            console.log(`Funcionário ${funcionario.getNome()} associado à etapa ${etapaNome}`);
        } else {
            console.log(`\n Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }

    public iniciarEtapa(etapaNome: string): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            etapa.iniciarEtapa();
        } else {
            console.log(`\n Erro: Etapa '${etapaNome}' não encontrada.`);
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

    public realizarTeste(tipo: TipoTeste, resultado: ResultadoTeste, aeronave?: Aeronave): void {
        const novoTeste = new Teste(tipo, resultado);
        this.testes.push(novoTeste);
        if (aeronave) {
            aeronave.adicionarTeste(novoTeste);
        }
        console.log(`\n Novo teste '${tipo}' realizado com resultado: ${resultado}.`);
    }

    private testes: Teste[] = [];

    public getTestes(): Teste[] {
        return this.testes;
    }

    public gerarRelatorioFinal(cliente: string, dataEntrega: Date, responsavel: Funcionario, aeronave: Aeronave): void {
        const relatorio = new Relatorio(aeronave, cliente, dataEntrega, this.etapas, this.testes, this.pecas, responsavel);
        relatorio.gerarRelatorioCompleto();
    }
}