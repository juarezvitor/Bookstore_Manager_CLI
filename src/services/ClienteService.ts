import { ClienteRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../models/Cliente";
import { ICliente } from "../interfaces/ICliente";
import { AppError } from "../utils/AppError";

export class ClienteService {
  constructor(
    private clienteRepository: ClienteRepository = new ClienteRepository(),
  ) {}

  async cadastrar(dados: ICliente): Promise<Cliente> {
    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new AppError("O nome do cliente é obrigatório.");
    }
    if (!dados.email || dados.email.trim().length === 0) {
      throw new AppError("O email do cliente é obrigatório.");
    }

    const existente = await this.clienteRepository.buscarPorEmail(dados.email);
    if (existente) {
      throw new AppError(
        `Já existe um cliente cadastrado com o email ${dados.email}.`,
      );
    }

    const cliente = new Cliente(dados);
    return this.clienteRepository.criar(cliente);
  }

  async listar(): Promise<Cliente[]> {
    return this.clienteRepository.listarTodos();
  }

  async buscarPorId(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new AppError(`Cliente com id ${id} não encontrado.`);
    }
    return cliente;
  }

  async atualizar(id: number, dados: ICliente): Promise<Cliente> {
    await this.buscarPorId(id);

    const existente = await this.clienteRepository.buscarPorEmail(dados.email);
    if (existente && existente.id !== id) {
      throw new AppError(
        `Já existe outro cliente cadastrado com o email ${dados.email}.`,
      );
    }

    const clienteAtualizado = new Cliente(dados);
    const resultado = await this.clienteRepository.atualizar(
      id,
      clienteAtualizado,
    );
    if (!resultado) {
      throw new AppError(`Não foi possível atualizar o cliente com id ${id}.`);
    }
    return resultado;
  }

  async excluir(id: number): Promise<void> {
    await this.buscarPorId(id);
    const excluido = await this.clienteRepository.excluir(id);
    if (!excluido) {
      throw new AppError(`Não foi possível excluir o cliente com id ${id}.`);
    }
  }
}
