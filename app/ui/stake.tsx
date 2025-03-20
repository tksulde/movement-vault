"use client";

import { useState } from "react";
import { Button } from "@/app/ui/button";
import AmountInput from "@/app/ui/amount-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";
import { WalletSelector } from "@/app/ui/wallet/wallet-selector";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { convertAmountFromHumanReadableToOnChain } from "@aptos-labs/ts-sdk";

import { useAccountStore } from "@/store/useAcountStore";
import { useTokenStore } from "@/store/useTokenStore";
import { useTransactionHandler } from "@/hooks/use-transaction-handler";
import { unstake } from "@/action/entry-functions/unstake";
import { stake } from "@/action/entry-functions/stake";
import { StatsSection } from "./stats-action";
import { UserOperationsSection } from "./reward/user-operations";

export default function StakeDemo() {
  const { connected, signAndSubmitTransaction, account } = useWallet();

  const { accountTokenBalance, accountStakeAmount, isLoading } =
    useAccountStore();
  const { tokenData, isLoadingToken } = useTokenStore();

  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");

  const [open, setOpen] = useState(false);

  const { handleTransaction, isPending } = useTransactionHandler({
    amount,
    isDeposit,
    address: account?.address.toString() ?? "",
  });

  const onUnstakeClick = () =>
    handleTransaction(async () =>
      signAndSubmitTransaction(
        unstake({
          amount: convertAmountFromHumanReadableToOnChain(
            Number.parseInt(amount),
            tokenData?.decimals ?? 8
          ),
        })
      )
    );

  const onStakeClick = () =>
    handleTransaction(async () =>
      signAndSubmitTransaction(
        stake({
          amount: convertAmountFromHumanReadableToOnChain(
            Number.parseInt(amount),
            tokenData?.decimals ?? 8
          ),
          account,
        })
      )
    );

  return (
    <div className="flex flex-col w-full gap-4">
      <Tabs
        defaultValue="deposit"
        onValueChange={(value) => {
          setAmount("");
          setIsDeposit(value === "deposit");
        }}
      >
        <TabsList className="mb-2 gap-1 bg-transparent">
          <TabsTrigger
            value="deposit"
            className="py-1.5 flex gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none duration-300 ease-in-out"
          >
            Deposit
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            className="py-1.5 flex gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none duration-300 ease-in-out"
          >
            Withdraw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <AmountInput
            isLoading={isLoadingToken || isLoading}
            amount={amount}
            onChange={setAmount}
            balance={accountTokenBalance}
            symbol={tokenData?.symbol ?? ""}
          />
        </TabsContent>
        <TabsContent value="withdraw">
          <AmountInput
            isLoading={isLoadingToken || isLoading}
            amount={amount}
            symbol={tokenData?.symbol ?? ""}
            onChange={setAmount}
            balance={accountStakeAmount}
          />
        </TabsContent>
      </Tabs>

      <div className="shadow hover:bg-primary/5 dark:bg-foreground/5 bg-white rounded-2xl p-4 duration-200 ease-in-out">
        {/* <p className="text-muted-foreground text-sm font-light leading-6">
          stMOVE is the liquid staked representation of MOVE tokens within the
          Movement Vault, developed by Helix Labs. When users stake MOVE in the
          vault, they receive stMOVE in return, maintaining liquidity while
          earning staking rewards.
        </p> */}
        <StatsSection />
        <UserOperationsSection />
      </div>

      <div className="flex flex-col gap-2">
        {connected ? (
          <Button
            onClick={() => {
              return isDeposit ? onStakeClick() : onUnstakeClick();
            }}
            disabled={
              isPending ||
              (isDeposit ? !isDeposit || !amount : isDeposit || !amount)
            }
          >
            {isDeposit ? "Deposit" : "Withdraw"}
          </Button>
        ) : (
          <Button onClick={() => setOpen(!open)}>Connect Wallet</Button>
        )}
      </div>

      <div className="hidden">
        <WalletSelector open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
