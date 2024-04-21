export interface Costumer {
  Codigo: number;
  Nome: string;
  Sexo: string | null | undefined;
  DataNascimento?: Date | null;
  RGIE?: string | null;
  CPFCNPJ?: string | null;
  DataCadastro: Date;
  Telefone1?: string | null;
  Telefone2?: string | null;
  Telefone3?: string | null;
  Email?: string | null;
  CEP?: string | null;
  Endereco?: string | null;
  Numero?: string | null;
  Complemento?: string | null;
  Bairro?: string | null;
  Cidade?: string | null;
  UF?: string | null;
  Limite?: number | null;
  Saldo?: number | null;
  Bloqueado: boolean;
  Vencimento: number;
  UltimaCompra?: Date;
  Excluido: boolean;
}
