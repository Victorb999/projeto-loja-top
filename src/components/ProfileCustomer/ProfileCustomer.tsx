"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Cliente } from "@prisma/client";

interface Props {
  customer: Cliente;
}
export const ProfileCustomer = ({ customer }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>:eye</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{customer.Nome}</DialogTitle>
          <DialogDescription>
            <ul>
              <li>
                <span>CPF:</span>
                {customer.CPFCNPJ}
              </li>
              <li>
                <span>Telefone:</span>
                {customer.Telefone1}
              </li>
              <li>
                <span>Email:</span>
                {customer.Email}
              </li>
              <li>
                <span>Endereco:</span>
                {customer.Endereco}
              </li>
              <li>
                <span>Numero:</span>
                {customer.Numero}
              </li>
              <li>
                <span>Complemento:</span>
                {customer.Complemento}
              </li>
              <li>
                <span>Bairro:</span>
                {customer.Bairro}
              </li>
              <li>
                <span>Cidade:</span>
                {customer.Cidade}
              </li>
              <li>
                <span>UF:</span>
                {customer.UF}
              </li>
              <li>
                <span>CEP:</span>
                {customer.CEP}
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};