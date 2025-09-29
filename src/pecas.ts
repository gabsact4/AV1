import { TipoPeca } from './enums';

export default class Peca {
    private PecasNome: string;
    private PecasTipo: TipoPeca;
    private Fornecedro: string;
    private Status: string;
    
    constructor(PecasNome: string, PecasTipo: TipoPeca, Fornecedro: string, Status: string = "Disponível") {
        this.PecasNome = PecasNome;
        this.PecasTipo = PecasTipo;
        this.Fornecedro = Fornecedro;
        this.Status = Status;
    } 

    public getNome(): string {
         return this.PecasNome; 
        }
    public getTipo(): TipoPeca {
         return this.PecasTipo; 
        }
    public getFornecedor(): string {
         return this.Fornecedro; 
        }
    public getStatus(): string { 
        return this.Status; 
    }
}