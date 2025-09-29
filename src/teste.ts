import { TipoTeste, ResultadoTeste } from './enums';

export default class Teste {
    private testeTipo: TipoTeste;
    private resultado: ResultadoTeste;

    constructor(testeTipo: TipoTeste, resultado: ResultadoTeste) {
        this.testeTipo = testeTipo;
        this.resultado = resultado;
    }

    public getTesteTipo(): TipoTeste {
         return this.testeTipo; 
        }
    public getResultado(): ResultadoTeste {
         return this.resultado; 
        }
}