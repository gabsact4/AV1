import Funcionario from "./funcionario";

export default class Producao extends Funcionario {
    prodNome: string;
    prazo: number;
    prodStatus: string;

    constructor(id: number,funNome: string,telefone: number,endereco: string,usuario: string,senha: string,permicao: string,prodNome: string,prazo: number,prodStatus: string
    ) {
        super(id, funNome, telefone, endereco, usuario, senha, permicao);
        this.prodNome = prodNome;
        this.prazo = prazo;
        this.prodStatus = prodStatus;
    }
}
