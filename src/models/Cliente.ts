import { ICliente } from "../interfaces/ICliente";

export class Cliente implements ICliente {
  private _id?: number;
  private _nome: string;
  private _email: string;
  private _telefone?: string;

  constructor(dados: ICliente) {
    this._id = dados.id;
    this._nome = dados.nome;
    this._email = dados.email;
    this._telefone = dados.telefone;
  }

  get id(): number | undefined {
    return this._id;
  }
  get nome(): string {
    return this._nome;
  }
  get email(): string {
    return this._email;
  }
  get telefone(): string | undefined {
    return this._telefone;
  }

  set nome(novoNome: string) {
    if (!novoNome || novoNome.trim().length === 0) {
      throw new Error("O nome do cliente não pode ser vazio.");
    }
    this._nome = novoNome;
  }
}
