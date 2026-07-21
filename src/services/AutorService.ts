import { AutorRepository } from "../repositories/AutorRepository";
import { Autor } from "../models/Autor";
import { IAutor } from "../interfaces/IAutor";
import { AppError } from "../utils/AppError";

export class AutorService {
  constructor(
    private autorRepository: AutorRepository = new AutorRepository(),
  ) {}

  async cadastrar(dados: IAutor): Promise<Autor> {
    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new AppError("O nome do autor é obrigatório.");
    }

    const autor = new Autor(dados);
    return this.autorRepository.criar(autor);
  }

  async listar(): Promise<Autor[]> {
    return this.autorRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Autor> {
    const autor = await this.autorRepository.buscarPorId(id);

    if (!autor) {
      throw new AppError(`Autor com id ${id} não encontrado.`);
    }

    return autor;
  }

  async atualizar(id: number, dados: IAutor): Promise<Autor> {
    await this.buscarPorId(id);

    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new AppError("O nome do autor é obrigatório.");
    }

    const autorAtualizado = new Autor(dados);
    const resultado = await this.autorRepository.atualizar(id, autorAtualizado);

    if (!resultado) {
      throw new AppError(`Não foi possível atualizar o autor com id ${id}.`);
    }

    return resultado;
  }

  async excluir(id: number): Promise<void> {
    await this.buscarPorId(id);

    const excluido = await this.autorRepository.excluir(id);

    if (!excluido) {
      throw new AppError(`Não foi possível excluir o autor com id ${id}.`);
    }
  }
}
