"use client";

import { toast } from "sonner";
import { Copy, LogOut, User } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { MdWallet } from "react-icons/md";
import {
  APTOS_CONNECT_ACCOUNT_URL,
  isAptosConnectWallet,
  truncateAddress,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

import { Button } from "@/app/ui/button";
import { Dialog, DialogTrigger } from "@/app/ui/dialog";
import { ConnectWalletDialog } from "@/app/ui/wallet-connect/wallet-connect-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu";

export function WalletSelector({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const { account, connected, disconnect, wallet } = useWallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const copyAddress = useCallback(async () => {
    if (!account?.address) return;
    try {
      await navigator.clipboard.writeText(account.address.toString());
      toast.success("Copied wallet address to clipboard.");
    } catch {
      toast.error("Failed to copy wallet address.");
    }
  }, [account?.address]);

  return connected ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1.5">
          <MdWallet className="w-5 h-5" />
          {account?.ansName ||
            truncateAddress(account?.address.toString()) ||
            "Unknown"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[150px]">
        <DropdownMenuItem onSelect={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" /> Copy address
        </DropdownMenuItem>
        {wallet && isAptosConnectWallet(wallet) && (
          <DropdownMenuItem asChild>
            <a
              href={APTOS_CONNECT_ACCOUNT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2"
            >
              <User className="h-4 w-4" /> Account
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={disconnect} className="gap-2">
          <LogOut className="h-4 w-4" /> Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Dialog
      open={open ?? isDialogOpen}
      onOpenChange={setOpen ?? setIsDialogOpen}
      aria-describedby={undefined}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1.5">
          <MdWallet className="w-5 h-5" />
          {account?.address
            ? account?.address.toString().slice(0, 4) +
              "..." +
              account?.address.toString().slice(-4)
            : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <ConnectWalletDialog close={closeDialog} />
    </Dialog>
  );
}
