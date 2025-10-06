import Aeronave from './nave';
import Peca from './pecas';
import Etapa from './etapa';
import Funcionario from './funcionario';
import Teste from './teste';
import Relatorio from './relatorio';
import { Persistencia } from './persistencia';
import { TipoAeronave, TipoPeca, StatusEtapa, StatusPeca, NivelPermissao, TipoTeste, ResultadoTeste } from './enums'; 

export default class SistemaProducao {
    private aeronaves: Aeronave[] = [];
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    public funcionarios: Funcionario[] = [
        new Funcionario(1, "Silvio Santos", "11999999999", "Av.Brasil", "admin", "123", NivelPermissao.ADMINISTRADOR)
    ];
    private testes: Teste[] = [];

    constructor() {
        Persistencia.carregarDados(this);
    }

    public login(usuario: string, senha: string): boolean {
        const funcionario = this.funcionarios.find(f => 
            f.autenticar(usuario, senha)
        );
        return funcionario !== undefined;
    }

    public adicionarAeronave(aeronave: Aeronave): void {
        const existe = this.aeronaves.find(a => {
            const aDetalhes = (a as any).codigo;
            const aeronaveDetalhes = (aeronave as any).codigo;
            return aDetalhes === aeronaveDetalhes;
        });
        if (existe) {
            console.log("Erro: Já existe uma aeronave com esse código.");
            return;
        }
        this.aeronaves.push(aeronave);
        console.log("Aeronave cadastrada com sucesso!");
    }

    public adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
        console.log("Peça cadastrada com sucesso!");
    }

    public adicionarEtapa(etapa: Etapa): void {
        const existe = this.etapas.find(e => e.nome === etapa.nome);
        if (existe) {
            console.log("Erro: Já existe uma etapa com esse nome.");
            return;
        }
        this.etapas.push(etapa);
        console.log("Etapa cadastrada com sucesso!");
    }

    public adicionarFuncionario(funcionario: Funcionario): void {
        const existeId = this.funcionarios.find(f => f.getId() === funcionario.getId());
        
        if (existeId) {
            console.log("Erro: Já existe um funcionário com esse ID.");
            return;
        }
        
        this.funcionarios.push(funcionario);
        console.log(`Funcionário ${funcionario.getNome()} cadastrado com sucesso!`);
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

    public getTestes(): Teste[] {
        return this.testes;
    }

    public getFuncionarios(): Funcionario[] {
        return this.funcionarios;
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
            etapa.associarFuncionario(funcionario);
            console.log(`Funcionário ${funcionario.getNome()} associado à etapa ${etapaNome}`);
        } else {
            console.log(`\n Erro: Etapa com nome '${etapaNome}' não encontrada.`);
        }
    }

    public iniciarEtapa(etapaNome: string): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0) {
                const etapaAnterior = this.etapas[index - 1];
                if (etapaAnterior.status !== StatusEtapa.CONCLUIDA) {
                    console.log(`Atenção: A etapa anterior '${etapaAnterior.nome}' não está concluída.`);
                }
            }
            etapa.iniciarEtapa();
            console.log(`Etapa '${etapaNome}' iniciada com sucesso!`);
        } else {
            console.log(`\n Erro: Etapa '${etapaNome}' não encontrada.`);
        }
    }

    public finalizarEtapa(etapaNome: string): void {
        const etapa = this.etapas.find(e => e.nome === etapaNome);
        if (etapa) {
            const index = this.etapas.indexOf(etapa);
            if (index > 0) {
                const etapaAnterior = this.etapas[index - 1];
                if (etapaAnterior.status !== StatusEtapa.CONCLUIDA) {
                    console.log(`Atenção: A etapa anterior '${etapaAnterior.nome}' não está concluída.`);
                }
            }
            etapa.finalizarEtapa();
            console.log(`Etapa '${etapaNome}' finalizada com sucesso!`);
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

    public salvarDados(): void {
        Persistencia.salvarDados(this);
    }

    public gerarRelatorioFinal(cliente: string, dataEntrega: Date, responsavel: Funcionario, aeronave: Aeronave): void {
        const relatorio = new Relatorio(aeronave, cliente, dataEntrega, this.etapas, this.testes, this.pecas, responsavel);
        relatorio.gerarRelatorioCompleto();
    }
}