import {
  EmprestimoRepository,
  IEmprestimoDetalhado,
} from "../repositories/EmprestimoRepository";
import { LivroRepository } from "../repositories/LivroRepository";
import { LivroService } from "./LivroService";
import { ClienteService } from "./ClienteService";
import { Emprestimo } from "../models/Emprestimo";
import { AppError } from "../utils/AppError";

export class EmprestimoService {
  constructor(
    private emprestimoRepository: EmprestimoRepository = new EmprestimoRepository(),
    private livroRepository: LivroRepository = new LivroRepository(),
    private livroService: LivroService = new LivroService(),
    private clienteService: ClienteService = new ClienteService(),
  ) {}

  async cadastrar(livroId: number, clienteId: number): Promise<Emprestimo> {
    const livro = await this.livroService.buscarPorId(livroId);
    await this.clienteService.buscarPorId(clienteId);

    if (!livro.disponivel) {
      throw new AppError(
        `O livro "${livro.titulo}" não está disponível para empréstimo.`,
      );
    }

    const emprestimo = new Emprestimo({ livroId, clienteId });
    const criado = await this.emprestimoRepository.criar(emprestimo);

    await this.livroRepository.atualizarDisponibilidade(livroId, false);

    return criado;
  }

  async listar(): Promise<IEmprestimoDetalhado[]> {
    return this.emprestimoRepository.listarComDetalhes();
  }

  async buscarPorId(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.buscarPorId(id);
    if (!emprestimo) {
      throw new AppError(`Empréstimo com id ${id} não encontrado.`);
    }
    return emprestimo;
  }

  async finalizarDevolucao(id: number): Promise<void> {
    const emprestimo = await this.buscarPorId(id);

    if (!emprestimo.estaEmAberto()) {
      throw new AppError("Este empréstimo já foi finalizado anteriormente.");
    }

    emprestimo.finalizarDevolucao();
    await this.emprestimoRepository.registrarDevolucao(
      id,
      emprestimo.dataDevolucao as Date,
    );
    await this.livroRepository.atualizarDisponibilidade(
      emprestimo.livroId,
      true,
    );
  }

  async excluir(id: number): Promise<void> {
    await this.buscarPorId(id);
    const excluido = await this.emprestimoRepository.excluir(id);
    if (!excluido) {
      throw new AppError(`Não foi possível excluir o empréstimo com id ${id}.`);
    }
  }
}
