import { LivroRepository } from "../repositories/LivroRepository";
import { AutorService } from "./AutorService";
import { Livro } from "../models/Livro";
import { ILivro } from "../interfaces/ILivro";
import { AppError } from "../utils/AppError";

export class LivroService {
  constructor(
    private livroRepository: LivroRepository = new LivroRepository(),
    private autorService: AutorService = new AutorService(),
  ) {}

  async cadastrar(dados: ILivro): Promise<Livro> {
    if (!dados.titulo || dados.titulo.trim().length === 0) {
      throw new AppError("O título do livro é obrigatório.");
    }

    // Garante que o autor existe antes de criar o livro.
    // buscarPorId já lança AppError se não existir.
    await this.autorService.buscarPorId(dados.autorId);

    const livro = new Livro(dados);
    return this.livroRepository.criar(livro);
  }

  async listar(): Promise<Livro[]> {
    return this.livroRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Livro> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) {
      throw new AppError(`Livro com id ${id} não encontrado.`);
    }
    return livro;
  }

  async atualizar(id: number, dados: ILivro): Promise<Livro> {
    await this.buscarPorId(id);
    await this.autorService.buscarPorId(dados.autorId);

    if (!dados.titulo || dados.titulo.trim().length === 0) {
      throw new AppError("O título do livro é obrigatório.");
    }

    const livroAtualizado = new Livro(dados);
    const resultado = await this.livroRepository.atualizar(id, livroAtualizado);

    if (!resultado) {
      throw new AppError(`Não foi possível atualizar o livro com id ${id}.`);
    }

    return resultado;
  }

  async excluir(id: number): Promise<void> {
    await this.buscarPorId(id);

    const excluido = await this.livroRepository.excluir(id);
    if (!excluido) {
      throw new AppError(`Não foi possível excluir o livro com id ${id}.`);
    }
  }
}
