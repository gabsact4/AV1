"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const sistema_1 = __importDefault(require("./sistema"));
const nave_1 = __importDefault(require("./nave"));
const pecas_1 = __importDefault(require("./pecas"));
const etapa_1 = __importDefault(require("./etapa"));
const funcionario_1 = __importDefault(require("./funcionario"));
const relatorio_1 = __importDefault(require("./relatorio"));
const enums_1 = require("./enums");
const sistema = new sistema_1.default();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("=== Sistema Aerocode ===");
        const { usuario, senha } = yield inquirer_1.default.prompt([
            { type: "input", name: "usuario", message: "Usuário:" },
            { type: "password", name: "senha", message: "Senha:" }
        ]);
        if (sistema.login(usuario, senha)) {
            yield menuPrincipal();
        }
        else {
            console.log("Credenciais inválidas!");
        }
    });
}
function menuPrincipal() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const { opcao } = yield inquirer_1.default.prompt([{
                    type: "list",
                    name: "opcao",
                    message: "Menu:",
                    choices: [
                        "Cadastros",
                        "Alterar Status",
                        "Listar",
                        "Relatório",
                        "Sair"
                    ]
                }]);
            if (opcao === "Cadastros")
                yield menuCadastros();
            else if (opcao === "Alterar Status")
                yield menuAlterar();
            else if (opcao === "Listar")
                yield menuListar();
            else if (opcao === "Relatório")
                yield gerarRelatorio();
            else if (opcao === "Sair")
                break;
        }
    });
}
function menuCadastros() {
    return __awaiter(this, void 0, void 0, function* () {
        const { opcao } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "opcao",
                message: "Cadastrar:",
                choices: [
                    "Aeronave",
                    "Peça",
                    "Etapa",
                    "Funcionário",
                    "Teste",
                    "Voltar"
                ]
            }]);
        if (opcao === "Aeronave")
            yield cadastrarAeronave();
        else if (opcao === "Peça")
            yield cadastrarPeca();
        else if (opcao === "Etapa")
            yield cadastrarEtapa();
        else if (opcao === "Funcionário")
            yield cadastrarFuncionario();
        else if (opcao === "Teste")
            yield cadastrarTeste();
    });
}
function menuAlterar() {
    return __awaiter(this, void 0, void 0, function* () {
        const { opcao } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "opcao",
                message: "Alterar:",
                choices: [
                    "Status da Peça",
                    "Associar Funcionário à Etapa",
                    "Iniciar Etapa",
                    "Finalizar Etapa",
                    "Voltar"
                ]
            }]);
        if (opcao === "Status da Peça")
            yield atualizarStatusPeca();
        else if (opcao === "Associar Funcionário à Etapa")
            yield associarFuncionarioEtapa();
        else if (opcao === "Iniciar Etapa")
            yield iniciarEtapa();
        else if (opcao === "Finalizar Etapa")
            yield finalizarEtapa();
    });
}
function menuListar() {
    return __awaiter(this, void 0, void 0, function* () {
        const { opcao } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "opcao",
                message: "Listar:",
                choices: [
                    "Aeronaves",
                    "Peças",
                    "Etapas",
                    "Funcionários",
                    "Testes",
                    "Voltar"
                ]
            }]);
        if (opcao === "Aeronaves")
            listarAeronaves();
        else if (opcao === "Peças")
            listarPecas();
        else if (opcao === "Etapas")
            listarEtapas();
        else if (opcao === "Funcionários")
            listarFuncionarios();
        else if (opcao === "Testes")
            listarTestes();
    });
}
function cadastrarAeronave() {
    return __awaiter(this, void 0, void 0, function* () {
        const respostas = yield inquirer_1.default.prompt([
            { type: "number", name: "codigo", message: "Código:" },
            { type: "input", name: "modelo", message: "Modelo:" },
            { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(enums_1.TipoAeronave) },
            { type: "number", name: "capacidade", message: "Capacidade:" },
            { type: "number", name: "alcance", message: "Alcance:" }
        ]);
        const aeronave = new nave_1.default(respostas.codigo, respostas.modelo, respostas.tipo, respostas.capacidade, respostas.alcance);
        sistema.adicionarAeronave(aeronave);
    });
}
function cadastrarPeca() {
    return __awaiter(this, void 0, void 0, function* () {
        const respostas = yield inquirer_1.default.prompt([
            { type: "input", name: "nome", message: "Nome:" },
            { type: "input", name: "fornecedor", message: "Fornecedor:" },
            { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(enums_1.TipoPeca) }
        ]);
        const peca = new pecas_1.default(respostas.nome, respostas.tipo, respostas.fornecedor);
        sistema.adicionarPeca(peca);
    });
}
function cadastrarEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        const respostas = yield inquirer_1.default.prompt([
            { type: "input", name: "nome", message: "Nome:" },
            { type: "number", name: "prazo", message: "Prazo (dias):" }
        ]);
        const etapa = new etapa_1.default(respostas.nome, respostas.prazo);
        sistema.adicionarEtapa(etapa);
    });
}
function cadastrarFuncionario() {
    return __awaiter(this, void 0, void 0, function* () {
        const respostas = yield inquirer_1.default.prompt([
            { type: "number", name: "id", message: "ID:" },
            { type: "input", name: "nome", message: "Nome:" },
            { type: "input", name: "telefone", message: "Telefone:" },
            { type: "input", name: "endereco", message: "Endereço:" },
            { type: "input", name: "usuario", message: "Usuário:" },
            { type: "password", name: "senha", message: "Senha:" },
            { type: "list", name: "permissao", message: "Permissão:", choices: Object.values(enums_1.NivelPermissao) }
        ]);
        const funcionario = new funcionario_1.default(respostas.id, respostas.nome, respostas.telefone, respostas.endereco, respostas.usuario, respostas.senha, respostas.permissao);
        sistema.adicionarFuncionario(funcionario);
    });
}
function cadastrarTeste() {
    return __awaiter(this, void 0, void 0, function* () {
        const respostas = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "tipo",
                message: "Tipo de Teste:",
                choices: ["ELETRICO", "HIDRAULICO", "AERODINAMICO"]
            },
            {
                type: "list",
                name: "resultado",
                message: "Resultado:",
                choices: ["APROVADO", "REPROVADO"]
            }
        ]);
        sistema.realizarTeste(respostas.tipo, respostas.resultado);
        console.log("Teste cadastrado com sucesso!");
    });
}
function associarFuncionarioEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        const funcionarios = sistema.getFuncionarios();
        const etapas = sistema.getEtapas();
        if (funcionarios.length === 0 || etapas.length === 0)
            return;
        const { funcionarioEscolhido } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "funcionarioEscolhido",
                message: "Funcionário:",
                choices: funcionarios.map(f => f.getNome())
            }]);
        const { etapaEscolhida } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "etapaEscolhida",
                message: "Etapa:",
                choices: etapas.map(e => e.nome)
            }]);
        const funcionario = funcionarios.find(f => f.getNome() === funcionarioEscolhido);
        if (funcionario) {
            sistema.adicionarFuncionarioAEtapa(etapaEscolhida, funcionario);
        }
    });
}
function iniciarEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        const etapas = sistema.getEtapas();
        if (etapas.length === 0)
            return;
        const { etapaEscolhida } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "etapaEscolhida",
                message: "Etapa:",
                choices: etapas.map(e => e.nome)
            }]);
        sistema.iniciarEtapa(etapaEscolhida);
    });
}
function finalizarEtapa() {
    return __awaiter(this, void 0, void 0, function* () {
        const etapas = sistema.getEtapas();
        if (etapas.length === 0)
            return;
        const { etapaEscolhida } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "etapaEscolhida",
                message: "Etapa:",
                choices: etapas.map(e => e.nome)
            }]);
        sistema.finalizarEtapa(etapaEscolhida);
    });
}
function atualizarStatusPeca() {
    return __awaiter(this, void 0, void 0, function* () {
        const pecas = sistema.getPecas();
        if (pecas.length === 0)
            return;
        const { nomePeca } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "nomePeca",
                message: "Peça:",
                choices: pecas.map(p => p.getNome())
            }]);
        const { novoStatus } = yield inquirer_1.default.prompt([{
                type: "list",
                name: "novoStatus",
                message: "Status:",
                choices: Object.values(enums_1.StatusPeca)
            }]);
        sistema.atualizarStatusPeca(nomePeca, novoStatus);
    });
}
function listarAeronaves() {
    const aeronaves = sistema.getAeronaves();
    console.log("\nAeronaves:");
    aeronaves.forEach(a => console.log(`- ${a.getDetalhes()}`));
}
function listarPecas() {
    const pecas = sistema.getPecas();
    console.log("\nPeças:");
    pecas.forEach(p => console.log(`- ${p.getNome()} | ${p.getTipo()} | ${p.getStatus()}`));
}
function listarEtapas() {
    const etapas = sistema.getEtapas();
    console.log("\nEtapas:");
    etapas.forEach(e => console.log(`- ${e.nome} | ${e.prazo}d | ${e.status}`));
}
function listarFuncionarios() {
    const funcionarios = sistema.getFuncionarios();
    console.log("\nFuncionários:");
    funcionarios.forEach(f => console.log(`- ${f.getNome()} | ${f.getTelefone()} | ${f.getPermissao()}`));
}
function listarTestes() {
    const testes = sistema.getTestes();
    console.log("\nTestes:");
    testes.forEach(t => console.log(`- ${t.getTipo()} | ${t.getResultado()}`));
}
function gerarRelatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        const aeronaves = sistema.getAeronaves();
        if (aeronaves.length === 0)
            return;
        const aeronave = aeronaves[0];
        const funcionarios = sistema.getFuncionarios();
        const responsavel = funcionarios[0];
        const relatorio = new relatorio_1.default(aeronave, "Cliente", new Date(), sistema.getEtapas(), sistema.getTestes(), sistema.getPecas(), responsavel);
        relatorio.gerarRelatorioCompleto();
    });
}
main();
