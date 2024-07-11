"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EyeOpenIcon } from "@radix-ui/react-icons";

import { Cliente } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface Props {
  customer: Cliente;
}
export const ProfileCustomer = ({ customer }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className=" py-2 ">
        <Button variant="secondary">
          <EyeOpenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{customer.Nome}</DialogTitle>
          <DialogDescription>
            {Object.keys(customer).map((key, index) => (
              <ul key={index}>
                <li>
                  <span className="font-bold mr-2">{key}:</span>
                  <span>
                    {customer[key as keyof typeof customer] === null
                      ? "-"
                      : customer[
                          key as keyof typeof customer
                        ]?.toLocaleString()}
                  </span>
                </li>
              </ul>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
