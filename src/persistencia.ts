import { readFileSync, writeFileSync, existsSync } from 'fs';
import Aeronave from './nave';
import Peca from './pecas';
import Etapa from './etapa';
import Teste from './teste';
import Funcionario from './funcionario';
import { TipoAeronave, TipoPeca, StatusPeca, StatusEtapa, NivelPermissao, TipoTeste, ResultadoTeste } from './enums';

interface DadosSistema {
  aeronaves: any[];
  pecas: any[];
  etapas: any[];
  testes: any[];
  funcionarios: any[];
}

export class Persistencia {
  private static readonly ARQUIVO_DADOS = 'dados_sistema.json';

  public static salvarDados(sistema: any): void {
    try {
      const dados: DadosSistema = {
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
          codigo: (a as any).codigo,
          modelo: (a as any).modelo,
          tipo: (a as any).tipo,
          capacidade: (a as any).capacidade,
          alcance: (a as any).alcance
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

      writeFileSync(this.ARQUIVO_DADOS, JSON.stringify(dados, null, 2), 'utf8');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  public static carregarDados(sistema: any): void {
    try {
      if (!existsSync(this.ARQUIVO_DADOS)) {
        return;
      }

      const dadosJson = readFileSync(this.ARQUIVO_DADOS, 'utf8');
      const dados: DadosSistema = JSON.parse(dadosJson);

      for (let i = 0; i < dados.aeronaves.length; i++) {
        const aeronaveData = dados.aeronaves[i];
        const aeronave = new Aeronave(
          aeronaveData.codigo,
          aeronaveData.modelo,
          aeronaveData.tipo,
          aeronaveData.capacidade,
          aeronaveData.alcance
        );
        sistema.adicionarAeronave(aeronave);
      }

      for (let i = 0; i < dados.pecas.length; i++) {
        const pecaData = dados.pecas[i];
        const peca = new Peca(
          pecaData.nome,
          pecaData.tipo,
          pecaData.fornecedor,
          pecaData.status
        );
        sistema.adicionarPeca(peca);
      }

      for (let i = 0; i < dados.etapas.length; i++) {
        const etapaData = dados.etapas[i];
        const etapa = new Etapa(etapaData.nome, etapaData.prazo);
        etapa.status = etapaData.status;
        sistema.adicionarEtapa(etapa);
      }

      for (let i = 0; i < dados.funcionarios.length; i++) {
        const funcData = dados.funcionarios[i];
        const funcionario = new Funcionario(
          funcData.id,
          funcData.nome,
          funcData.telefone || "",
          funcData.endereco || "",
          funcData.usuario,
          funcData.senha,
          funcData.permissao
        );
        sistema.funcionarios.push(funcionario);
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }
}