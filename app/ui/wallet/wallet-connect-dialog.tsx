import { ChevronDown } from "lucide-react";
import {
  AboutAptosConnect,
  groupAndSortWallets,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";

import { Button } from "@/app/ui/button";
import { renderEducationScreen } from "@/app/ui/wallet/render-edu";
import { DialogContent, DialogHeader, DialogTitle } from "@/app/ui/dialog";
import { WalletRow } from "@/app/ui/wallet/wallet-row";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/ui/collapsible";

interface ConnectWalletDialogProps {
  close: () => void;
}

export function ConnectWalletDialog({ close }: ConnectWalletDialogProps) {
  const { wallets = [] } = useWallet();
  const { aptosConnectWallets, availableWallets, installableWallets } =
    groupAndSortWallets(wallets);

  const hasAptosConnectWallets = !!aptosConnectWallets.length;

  return (
    <DialogContent className="max-h-screen overflow-auto">
      <AboutAptosConnect renderEducationScreen={renderEducationScreen}>
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center leading-snug">
            {hasAptosConnectWallets ? (
              <>
                <span>Movement Connect</span>
              </>
            ) : (
              "Connect Wallet"
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-3">
          {availableWallets.map((wallet) => (
            <WalletRow key={wallet.name} wallet={wallet} onConnect={close} />
          ))}
          {!!installableWallets.length && (
            <Collapsible className="flex flex-col gap-3">
              <CollapsibleTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-2">
                  More wallets <ChevronDown />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-3">
                {installableWallets.map((wallet) => (
                  <WalletRow
                    key={wallet.name}
                    wallet={wallet}
                    onConnect={close}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>
      </AboutAptosConnect>
    </DialogContent>
  );
}
