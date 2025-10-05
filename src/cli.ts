import inquirer from "inquirer";
import SistemaProducao from "./sistema";
import Aeronave from "./nave";
import Peca from "./pecas";
import Etapa from "./etapa";
import Funcionario from "./funcionario";
import Relatorio from "./relatorio";
import { TipoAeronave, TipoPeca, StatusPeca, NivelPermissao, TipoTeste, ResultadoTeste } from "./enums";

const sistema = new SistemaProducao();

async function main() {
    console.log("=== Sistema Aerocode ===");

    const { usuario, senha } = await inquirer.prompt([
        { type: "input", name: "usuario", message: "Usuário:" },
        { type: "password", name: "senha", message: "Senha:" }
    ]);

    if (sistema.login(usuario, senha)) {
        await menuPrincipal();
    } else {
        console.log("Credenciais inválidas!");
    }
}

async function menuPrincipal() {
    while (true) {
        const { opcao } = await inquirer.prompt([{
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

        if (opcao === "Cadastros") await menuCadastros();
        else if (opcao === "Alterar Status") await menuAlterar();
        else if (opcao === "Listar") await menuListar();
        else if (opcao === "Relatório") await gerarRelatorio();
        else if (opcao === "Sair") break;
    }
}

async function menuCadastros() {
    const { opcao } = await inquirer.prompt([{
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

    if (opcao === "Aeronave") await cadastrarAeronave();
    else if (opcao === "Peça") await cadastrarPeca();
    else if (opcao === "Etapa") await cadastrarEtapa();
    else if (opcao === "Funcionário") await cadastrarFuncionario();
    else if (opcao === "Teste") await cadastrarTeste();
}

async function menuAlterar() {
    const { opcao } = await inquirer.prompt([{
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

    if (opcao === "Status da Peça") await atualizarStatusPeca();
    else if (opcao === "Associar Funcionário à Etapa") await associarFuncionarioEtapa();
    else if (opcao === "Iniciar Etapa") await iniciarEtapa();
    else if (opcao === "Finalizar Etapa") await finalizarEtapa();
}

async function menuListar() {
    const { opcao } = await inquirer.prompt([{
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

    if (opcao === "Aeronaves") listarAeronaves();
    else if (opcao === "Peças") listarPecas();
    else if (opcao === "Etapas") listarEtapas();
    else if (opcao === "Funcionários") listarFuncionarios();
    else if (opcao === "Testes") listarTestes();
}

async function cadastrarAeronave() {
    const respostas = await inquirer.prompt([
        { type: "number", name: "codigo", message: "Código:" },
        { type: "input", name: "modelo", message: "Modelo:" },
        { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(TipoAeronave) },
        { type: "number", name: "capacidade", message: "Capacidade:" },
        { type: "number", name: "alcance", message: "Alcance:" }
    ]);

    const aeronave = new Aeronave(
        respostas.codigo,
        respostas.modelo,
        respostas.tipo,
        respostas.capacidade,
        respostas.alcance
    );
    sistema.adicionarAeronave(aeronave);
}

async function cadastrarPeca() {
    const respostas = await inquirer.prompt([
        { type: "input", name: "nome", message: "Nome:" },
        { type: "input", name: "fornecedor", message: "Fornecedor:" },
        { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(TipoPeca) }
    ]);

    const peca = new Peca(respostas.nome, respostas.tipo, respostas.fornecedor);
    sistema.adicionarPeca(peca);
}

async function cadastrarEtapa() {
    const respostas = await inquirer.prompt([
        { type: "input", name: "nome", message: "Nome:" },
        { type: "number", name: "prazo", message: "Prazo (dias):" }
    ]);

    const etapa = new Etapa(respostas.nome, respostas.prazo);
    sistema.adicionarEtapa(etapa);
}

async function cadastrarFuncionario() {
    const respostas = await inquirer.prompt([
        { type: "number", name: "id", message: "ID:" },
        { type: "input", name: "nome", message: "Nome:" },
        { type: "input", name: "telefone", message: "Telefone:" },
        { type: "input", name: "endereco", message: "Endereço:" },
        { type: "input", name: "usuario", message: "Usuário:" },
        { type: "password", name: "senha", message: "Senha:" },
        { type: "list", name: "permissao", message: "Permissão:", choices: Object.values(NivelPermissao) }
    ]);

    const funcionario = new Funcionario(
        respostas.id,
        respostas.nome,
        respostas.telefone,
        respostas.endereco,
        respostas.usuario,
        respostas.senha,
        respostas.permissao
    );
    sistema.adicionarFuncionario(funcionario);
}

async function cadastrarTeste() {
    const respostas = await inquirer.prompt([
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
}

async function associarFuncionarioEtapa() {
    const funcionarios = sistema.getFuncionarios();
    const etapas = sistema.getEtapas();
    
    if (funcionarios.length === 0 || etapas.length === 0) return;

    const { funcionarioEscolhido } = await inquirer.prompt([{
        type: "list",
        name: "funcionarioEscolhido",
        message: "Funcionário:",
        choices: funcionarios.map(f => f.getNome())
    }]);

    const { etapaEscolhida } = await inquirer.prompt([{
        type: "list", 
        name: "etapaEscolhida",
        message: "Etapa:",
        choices: etapas.map(e => e.nome)
    }]);

    const funcionario = funcionarios.find(f => f.getNome() === funcionarioEscolhido);
    if (funcionario) {
        sistema.adicionarFuncionarioAEtapa(etapaEscolhida, funcionario);
    }
}

async function iniciarEtapa() {
    const etapas = sistema.getEtapas();
    if (etapas.length === 0) return;

    const { etapaEscolhida } = await inquirer.prompt([{
        type: "list",
        name: "etapaEscolhida",
        message: "Etapa:",
        choices: etapas.map(e => e.nome)
    }]);

    sistema.iniciarEtapa(etapaEscolhida);
}

async function finalizarEtapa() {
    const etapas = sistema.getEtapas();
    if (etapas.length === 0) return;

    const { etapaEscolhida } = await inquirer.prompt([{
        type: "list",
        name: "etapaEscolhida",
        message: "Etapa:",
        choices: etapas.map(e => e.nome)
    }]);

    sistema.finalizarEtapa(etapaEscolhida);
}

async function atualizarStatusPeca() {
    const pecas = sistema.getPecas();
    if (pecas.length === 0) return;

    const { nomePeca } = await inquirer.prompt([{
        type: "list",
        name: "nomePeca",
        message: "Peça:",
        choices: pecas.map(p => p.getNome())
    }]);

    const { novoStatus } = await inquirer.prompt([{
        type: "list",
        name: "novoStatus",
        message: "Status:",
        choices: Object.values(StatusPeca)
    }]);

    sistema.atualizarStatusPeca(nomePeca, novoStatus);
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

async function gerarRelatorio() {
    const aeronaves = sistema.getAeronaves();
    if (aeronaves.length === 0) return;

    const aeronave = aeronaves[0];
    const funcionarios = sistema.getFuncionarios();
    const responsavel = funcionarios[0];

    const relatorio = new Relatorio(
        aeronave,
        "Cliente",
        new Date(),
        sistema.getEtapas(),
        sistema.getTestes(),
        sistema.getPecas(),
        responsavel
    );

    relatorio.gerarRelatorioCompleto();
}

main();