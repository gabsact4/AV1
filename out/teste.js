"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Teste {
    constructor(testeTipo, resultado) {
        this.testeTipo = testeTipo;
        this.resultado = resultado;
    }
    getTesteTipo() {
        return this.testeTipo;
    }
    getResultado() {
        return this.resultado;
    }
}
exports.default = Teste;
