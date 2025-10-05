"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persistencia = void 0;
const fs_1 = require("fs");
const nave_1 = __importDefault(require("./nave"));
const pecas_1 = __importDefault(require("./pecas"));
const etapa_1 = __importDefault(require("./etapa"));
const funcionario_1 = __importDefault(require("./funcionario"));
class Persistencia {
    static salvarDados(sistema) {
        try {
            const dados = {
                aeronaves: [],
                pecas: [],
                etapas: [],
                testes: [],
                funcionarios: []
            };
            const aeronaves = sistema.getAeronaves();
            for (let i = 0; i < aeronaves.length; i++) {
                const a = aeronaves[i];
                dados.aeronaves.push({
                    codigo: a.codigo,
                    modelo: a.modelo,
                    tipo: a.tipo,
                    capacidade: a.capacidade,
                    alcance: a.alcance
                });
            }
            const pecas = sistema.getPecas();
            for (let i = 0; i < pecas.length; i++) {
                const p = pecas[i];
                dados.pecas.push({
                    nome: p.getNome(),
                    tipo: p.getTipo(),
                    fornecedor: p.getFornecedor(),
                    status: p.getStatus()
                });
            }
            const etapas = sistema.getEtapas();
            for (let i = 0; i < etapas.length; i++) {
                const e = etapas[i];
                dados.etapas.push({
                    nome: e.nome,
                    prazo: e.prazo,
                    status: e.status
                });
            }
            if (sistema.getTestes) {
                const testes = sistema.getTestes();
                for (let i = 0; i < testes.length; i++) {
                    const t = testes[i];
                    dados.testes.push({
                        tipo: t.getTipo(),
                        resultado: t.getResultado()
                    });
                }
            }
            if (sistema.funcionarios) {
                for (let i = 0; i < sistema.funcionarios.length; i++) {
                    const f = sistema.funcionarios[i];
                    dados.funcionarios.push({
                        id: f.getId(),
                        nome: f.getNome(),
                        telefone: f.getTelefone(),
                        endereco: f.getEndereco(),
                        usuario: f.getNome(),
                        senha: "123",
                        permissao: f.getPermissao()
                    });
                }
            }
            (0, fs_1.writeFileSync)(this.ARQUIVO_DADOS, JSON.stringify(dados, null, 2), 'utf8');
        }
        catch (error) {
            console.error('Erro ao salvar dados:', error);
        }
    }
    static carregarDados(sistema) {
        try {
            if (!(0, fs_1.existsSync)(this.ARQUIVO_DADOS)) {
                return;
            }
            const dadosJson = (0, fs_1.readFileSync)(this.ARQUIVO_DADOS, 'utf8');
            const dados = JSON.parse(dadosJson);
            for (let i = 0; i < dados.aeronaves.length; i++) {
                const aeronaveData = dados.aeronaves[i];
                const aeronave = new nave_1.default(aeronaveData.codigo, aeronaveData.modelo, aeronaveData.tipo, aeronaveData.capacidade, aeronaveData.alcance);
                sistema.adicionarAeronave(aeronave);
            }
            for (let i = 0; i < dados.pecas.length; i++) {
                const pecaData = dados.pecas[i];
                const peca = new pecas_1.default(pecaData.nome, pecaData.tipo, pecaData.fornecedor, pecaData.status);
                sistema.adicionarPeca(peca);
            }
            for (let i = 0; i < dados.etapas.length; i++) {
                const etapaData = dados.etapas[i];
                const etapa = new etapa_1.default(etapaData.nome, etapaData.prazo);
                etapa.status = etapaData.status;
                sistema.adicionarEtapa(etapa);
            }
            for (let i = 0; i < dados.funcionarios.length; i++) {
                const funcData = dados.funcionarios[i];
                const funcionario = new funcionario_1.default(funcData.id, funcData.nome, funcData.telefone || "", funcData.endereco || "", funcData.usuario, funcData.senha, funcData.permissao);
                sistema.funcionarios.push(funcionario);
            }
        }
        catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }
}
exports.Persistencia = Persistencia;
Persistencia.ARQUIVO_DADOS = 'dados_sistema.json';
