"use client";

import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { toast } from "sonner";
import { TooltipProvider } from "@/app/ui/tooltip";

export default function WalletProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      onError={(error) => {
        toast.error(error || "Unknown wallet error");
      }}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </AptosWalletAdapterProvider>
  );
}
