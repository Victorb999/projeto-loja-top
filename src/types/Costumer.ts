export interface Cliente {
  Codigo: number;
  Nome: string;
  Sexo?: string;
  DataNascimento?: Date;
  RGIE?: string;
  CPFCNPJ?: string;
  DataCadastro: Date;
  Telefone1?: string;
  Telefone2?: string;
  Telefone3?: string;
  Email?: string;
  CEP?: string;
  Endereco?: string;
  Numero?: string;
  Complemento?: string;
  Bairro?: string;
  Cidade?: string;
  UF?: string;
  Limite?: number;
  Saldo?: number;
  Bloqueado: boolean;
  Vencimento: number;
  UltimaCompra?: Date;
  Excluido: boolean;
}
