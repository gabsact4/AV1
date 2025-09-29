import Aeronave from './nave';
import Peca from './pecas';
import Funcionario from './funcionario';
import Etapa from './etapa';
import SistemaProducao from './sistema';
import { TipoAeronave, TipoPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste } from './enums';

const boeing737 = new Aeronave(1, "Boeing 737", TipoAeronave.COMERCIAL, 180, 5600);
const sistema = new SistemaProducao(boeing737);

const responsavelProjeto = new Funcionario(101, "Silvio Santos", 11111111111, "Rua SBT, 123", "joao@gmail", "senha123", NivelPermissao.ENGENHEIRO);

const pecaMotor = new Peca("Motor", TipoPeca.IMPORTADA, "Gol");
const pecaAsa = new Peca("Asa direita", TipoPeca.NACIONAL, "Embraer");

const etapaMontagem = new Etapa("Montagem ", 30);
const etapaMotores = new Etapa("Colocar os Motores", 15);
const etapaTesteSolo = new Etapa("Teste", 7);

const funcionarioMontador = new Funcionario(1, "Hermes e Renato", 222222222222, "Rua Dom Pedro I, 444", "Hermes.Renato@gamil.com", "Senha123", NivelPermissao.OPERADOR);

sistema.adicionarPeca(pecaMotor);
sistema.adicionarPeca(pecaAsa);

sistema.adicionarEtapa(etapaMontagem);
sistema.adicionarEtapa(etapaMotores);
sistema.adicionarEtapa(etapaTesteSolo);

sistema.adicionarFuncionarioAEtapa("Montagem", funcionarioMontador);

sistema.iniciarEtapa("Montagem da Estrutura");
sistema.finalizarEtapa("Montagem da Estrutura");

sistema.iniciarEtapa("Colocar os Motores");
sistema.finalizarEtapa("Colocar os Motores");

sistema.realizarTeste(TipoTeste.AERODINAMICO, ResultadoTeste.APROVADO);

sistema.gerarRelatorioFinal("Aeros S.A.", new Date(2025, 11, 31), responsavelProjeto);