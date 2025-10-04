import { TipoTeste, ResultadoTeste } from './enums';

export default class Teste {
    constructor(
        private tipo: TipoTeste,
        private resultado: ResultadoTeste
    ) {}

    public getTipo(): TipoTeste {
        return this.tipo;
    }

    public getResultado(): ResultadoTeste {
        return this.resultado;
    }
}