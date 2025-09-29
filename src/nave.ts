import Peca from './pecas';
import Etapa from './etapa';
import Teste from './teste';

export default class Aeronave {
    private codigo: number;
    private modelo: string;
    private tipo: string;
    private capacidade: number;
    private alcance: number;
    private pecas: Peca[] = [];
    private etapas: Etapa[] = [];
    private testes: Teste[] = [];

    constructor(codigo: number, modelo: string, tipo: string, capacidade: number, alcance: number) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    
    public get value(): string {
        return `Codigo:${this.codigo}, Modelo: ${this.modelo}, Tipo: ${this.tipo}, Capacidade: ${this.capacidade}, Alcance: ${this.alcance}`;
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
}