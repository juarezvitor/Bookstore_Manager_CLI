import { ILivro } from "../interfaces/ILivro";

export class Livro implements ILivro {
  private _id?: number;
  private _titulo: string;
  private _autorId: number;
  private _anoPublicacao?: number;
  private _genero?: string;
  private _disponivel: boolean;

  constructor(dados: ILivro) {
    this._id = dados.id;
    this._titulo = dados.titulo;
    this._autorId = dados.autorId;
    this._anoPublicacao = dados.anoPublicacao;
    this._genero = dados.genero;
    this._disponivel = dados.disponivel ?? true;
  }

  get id(): number | undefined {
    return this._id;
  }
  get titulo(): string {
    return this._titulo;
  }
  get autorId(): number {
    return this._autorId;
  }
  get anoPublicacao(): number | undefined {
    return this._anoPublicacao;
  }
  get genero(): string | undefined {
    return this._genero;
  }
  get disponivel(): boolean {
    return this._disponivel;
  }

  set titulo(novoTitulo: string) {
    if (!novoTitulo || novoTitulo.trim().length === 0) {
      throw new Error("O título do livro não pode ser vazio.");
    }
    this._titulo = novoTitulo;
  }

  marcarComoIndisponivel(): void {
    this._disponivel = false;
  }

  marcarComoDisponivel(): void {
    this._disponivel = true;
  }
}
