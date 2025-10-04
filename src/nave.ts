import Peca from './pecas';
import Etapa from './etapa';
import Teste from './teste';

export default class Aeronave {
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    private testes: Teste[] = [];

    constructor(
        private codigo: number,
        private modelo: string,
        private tipo: string,
        private capacidade: number,
        private alcance: number
    ) {}
    
    public getDetalhes(): string {
        return `Código: ${this.codigo}, Modelo: ${this.modelo}, Tipo: ${this.tipo}, Capacidade: ${this.capacidade}, Alcance: ${this.alcance}`;
    }

    public get value(): string {
        return this.getDetalhes();
    }

    public adicionarPeca(peca: Peca): void {
        this.pecas.push(peca);
    }

    public adicionarEtapa(etapa: Etapa): void {
        this.etapas.push(etapa);
    }
    
    public adicionarTeste(teste: Teste): void {
        this.testes.push(teste);
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
}