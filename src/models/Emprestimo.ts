import { IEmprestimo } from "../interfaces/IEmprestimo";

export class Emprestimo implements IEmprestimo {
  private _id?: number;
  private _livroId: number;
  private _clienteId: number;
  private _dataEmprestimo: Date;
  private _dataDevolucao: Date | null;

  constructor(dados: IEmprestimo) {
    this._id = dados.id;
    this._livroId = dados.livroId;
    this._clienteId = dados.clienteId;
    this._dataEmprestimo = dados.dataEmprestimo ?? new Date();
    this._dataDevolucao = dados.dataDevolucao ?? null;
  }

  get id(): number | undefined {
    return this._id;
  }
  get livroId(): number {
    return this._livroId;
  }
  get clienteId(): number {
    return this._clienteId;
  }
  get dataEmprestimo(): Date {
    return this._dataEmprestimo;
  }
  get dataDevolucao(): Date | null {
    return this._dataDevolucao;
  }

  estaEmAberto(): boolean {
    return this._dataDevolucao === null;
  }

  finalizarDevolucao(): void {
    if (!this.estaEmAberto()) {
      throw new Error("Este empréstimo já foi finalizado.");
    }
    this._dataDevolucao = new Date();
  }
}
