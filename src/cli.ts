import inquirer from "inquirer";
import SistemaProducao from "./sistema";
import Aeronave from "./nave";
import Peca from "./pecas";
import Etapa from "./etapa";
import { TipoAeronave, TipoPeca, StatusPeca } from "./enums";

const sistema = new SistemaProducao();

async function main() {
    console.log("=== Sistema Aerocode - Produção de Aeronaves ===");

    const { usuario, senha } = await inquirer.prompt([
        { type: "input", name: "usuario", message: "Usuário:", default: "admin" },
        { type: "password", name: "senha", message: "Senha:", default: "123" }
    ]);

    if (sistema.login(usuario, senha)) {
        console.log("Login realizado com sucesso!");
        await menuPrincipal();
    } else {
        console.log("Credenciais inválidas!");
        process.exit(1);
    }
}

async function menuPrincipal() {
    while (true) {
        const { opcao } = await inquirer.prompt([{
            type: "list",
            name: "opcao",
            message: "Menu Principal:",
            loop:false,
            choices: [
                "Cadastrar Aeronave",
                "Cadastrar Peça",
                "Cadastrar Etapa",
                "Atualizar Status da Peça",
                "Listar Aeronaves", 
                "Listar Peças",
                "Listar Etapas",
                "Gerar Relatório",
                "Sair"
            ]
        }]);

        if (opcao === "Cadastrar Aeronave") await cadastrarAeronave();
        else if (opcao === "Cadastrar Peça") await cadastrarPeca();
        else if (opcao === "Cadastrar Etapa") await cadastrarEtapa();
        else if (opcao === "Atualizar Status da Peça") await atualizarStatusPeca();
        else if (opcao === "Listar Aeronaves") listarAeronaves();
        else if (opcao === "Listar Peças") listarPecas();
        else if (opcao === "Listar Etapas") listarEtapas();
        else if (opcao === "Gerar Relatório") gerarRelatorio();
        else if (opcao === "Sair") {
            console.log("Sistema encerrado.");
            break;
        }
    }
}

async function cadastrarAeronave() {
    const respostas = await inquirer.prompt([
        { type: "number", name: "codigo", message: "Código único:" },
        { type: "input", name: "modelo", message: "Modelo:" },
        { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(TipoAeronave) },
        { type: "number", name: "capacidade", message: "Capacidade:" },
        { type: "number", name: "alcance", message: "Alcance (km):" }
    ]);

    try {
        const aeronave = new Aeronave(
            respostas.codigo,
            respostas.modelo,
            respostas.tipo as TipoAeronave,
            respostas.capacidade,
            respostas.alcance
        );
        sistema.adicionarAeronave(aeronave);
        console.log("Aeronave cadastrada com sucesso!");
    } catch (error: any) {
        console.log(`Erro: ${error.message}`);
    }
}

async function cadastrarPeca() {
    const respostas = await inquirer.prompt([
        { type: "input", name: "nome", message: "Nome da peça:" },
        { type: "input", name: "fornecedor", message: "Fornecedor:" },
        { type: "list", name: "tipo", message: "Tipo:", choices: Object.values(TipoPeca) }
    ]);

    const peca = new Peca(respostas.nome, respostas.tipo as TipoPeca, respostas.fornecedor);
    sistema.adicionarPeca(peca);
    console.log("Peça cadastrada com sucesso!");
}

async function cadastrarEtapa() {
    const respostas = await inquirer.prompt([
        { type: "input", name: "nome", message: "Nome da etapa:" },
        { type: "number", name: "prazo", message: "Prazo (dias):" }
    ]);

    const etapa = new Etapa(respostas.nome, respostas.prazo);
    sistema.adicionarEtapa(etapa);
    console.log("Etapa cadastrada com sucesso!");
}

async function atualizarStatusPeca() {
    const pecas = sistema.getPecas();
    if (pecas.length === 0) {
        console.log("Nenhuma peça cadastrada.");
        return;
    }

    const { nomePeca } = await inquirer.prompt([{
        type: "list",
        name: "nomePeca",
        message: "Selecione a peça:",
        choices: pecas.map(p => p.getNome())
    }]);

    const { novoStatus } = await inquirer.prompt([{
        type: "list",
        name: "novoStatus",
        message: "Novo status:",
        choices: Object.values(StatusPeca)
    }]);

    sistema.atualizarStatusPeca(nomePeca, novoStatus as StatusPeca);
    console.log(`Status da peça '${nomePeca}' atualizado para '${novoStatus}'`);
}

function listarAeronaves() {
    const aeronaves = sistema.getAeronaves();
    console.log("\n--- Aeronaves Cadastradas ---");
    if (aeronaves.length === 0) console.log("Nenhuma aeronave cadastrada.");
    else aeronaves.forEach(a => console.log(`- ${a.getDetalhes()}`));
}

function listarPecas() {
    const pecas = sistema.getPecas();
    console.log("\n--- Peças Cadastradas ---");
    if (pecas.length === 0) console.log("Nenhuma peça cadastrada.");
    else pecas.forEach(p => console.log(`- ${p.getNome()} | ${p.getTipo()} | ${p.getFornecedor()} | ${p.getStatus()}`));
}

function listarEtapas() {
    const etapas = sistema.getEtapas();
    console.log("\n--- Etapas Cadastradas ---");
    if (etapas.length === 0) console.log("Nenhuma etapa cadastrada.");
    else etapas.forEach(e => console.log(`- ${e.nome} | ${e.prazo} dias | ${e.status}`));
}

function gerarRelatorio() {
    console.log("\n----- Relatório Completo -----");
    listarAeronaves();
    listarPecas();
    listarEtapas();
    console.log("\nResumo:");
    console.log(`Total de Aeronaves: ${sistema.getAeronaves().length}`);
    console.log(`Total de Peças: ${sistema.getPecas().length}`);
    console.log(`Total de Etapas: ${sistema.getEtapas().length}`);
    console.log("=== Fim do Relatório ===\n");
}

main();
