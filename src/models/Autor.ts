import { IAutor } from "../interfaces/IAutor";

export class Autor implements IAutor {
  private _id?: number;
  private _nome: string;
  private _nacionalidade?: string;
  private _dataNascimento?: Date;

  constructor(dados: IAutor) {
    this._id = dados.id;
    this._nome = dados.nome;
    this._nacionalidade = dados.nacionalidade;
    this._dataNascimento = dados.dataNascimento;
  }

  get id(): number | undefined {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get nacionalidade(): string | undefined {
    return this._nacionalidade;
  }

  get dataNascimento(): Date | undefined {
    return this._dataNascimento;
  }

  set nome(novoNome: string) {
    if (!novoNome || novoNome.trim().length === 0) {
      throw new Error("O nome do autor não pode ser vazio.");
    }
    this._nome = novoNome;
  }
}
