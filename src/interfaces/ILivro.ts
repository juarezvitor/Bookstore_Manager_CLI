export interface ILivro {
  id?: number;
  titulo: string;
  autorId: number;
  anoPublicacao?: number;
  genero?: string;
  disponivel?: boolean;
}
