export default class Funcionario {
    private id: number;
    private funNome: string;
    private telefone: number;
    private endereco: string;
    private usuario: string;
    private senha: string;
    private permicao: string;

    constructor(id: number, funNome: string, telefone: number, endereco: string, usuario: string, senha: string, permicao: string) {
        this.id = id;
        this.funNome = funNome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.permicao = permicao;
    }

    public getId(): number {
         return this.id; 
    }
    public getNome(): string {
         return this.funNome; 
    }
    public getTelefone(): number {
         return this.telefone; 
    }
    public getEndereco(): string {
         return this.endereco; 
    }
    public getPermicao(): string {
         return this.permicao; 
    }
}