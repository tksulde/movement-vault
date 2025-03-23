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
import { useAccountStore2 } from "@/store/useAcountStore2";
import { useTokenStore2 } from "@/store/useTokenStore2";
import { hstMOVE, stMOVE } from "@/lib/constant";

export default function StakeDemo({ name }: { name: string }) {
  const { connected, signAndSubmitTransaction, account } = useWallet();

  const store1 = useAccountStore();
  const store2 = useAccountStore2();

  const storeToken1 = useTokenStore();
  const storeToken2 = useTokenStore2();

  let accountBalance = 0;
  let accountAmount = 0;
  let isLoad = false;

  let token = null;
  let isLoadToken = false;

  if (name === "stmove") {
    accountBalance = store1.accountTokenBalance;
    accountAmount = store1.accountStakeAmount;
    isLoad = store1.isLoading;

    token = storeToken1.tokenData;
    isLoadToken = storeToken1.isLoadingToken;
  } else {
    accountBalance = store2.accountTokenBalance;
    accountAmount = store2.accountStakeAmount;
    isLoad = store2.isLoading;

    token = storeToken2.tokenData;
    isLoadToken = storeToken2.isLoadingToken;
  }

  const [isDeposit, setIsDeposit] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");
  const [open, setOpen] = useState(false);

  const address = account?.address?.toString() ?? "";

  const { handleTransaction, isPending } = useTransactionHandler({
    amount,
    isDeposit,
    address,
    name,
  });

  const onUnstakeClick = () =>
    handleTransaction(async () =>
      signAndSubmitTransaction(
        unstake({
          amount: convertAmountFromHumanReadableToOnChain(
            Number.parseFloat(amount),
            token?.decimals ?? 8
          ),
          name: name === `stmove` ? stMOVE : hstMOVE,
        })
      )
    );

  const onStakeClick = () =>
    handleTransaction(async () =>
      signAndSubmitTransaction(
        stake({
          amount: convertAmountFromHumanReadableToOnChain(
            Number.parseFloat(amount),
            token?.decimals ?? 8
          ),
          account,
          name: name === `stmove` ? stMOVE : hstMOVE,
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
            isLoading={isLoadToken || isLoad}
            amount={amount}
            onChange={setAmount}
            balance={accountBalance}
            symbol={token?.symbol ?? ""}
          />
        </TabsContent>
        <TabsContent value="withdraw">
          <AmountInput
            isLoading={isLoadToken || isLoad}
            amount={amount}
            symbol={token?.symbol ?? ""}
            onChange={setAmount}
            balance={accountAmount}
          />
        </TabsContent>
      </Tabs>

      <div className="shadow hover:bg-primary/5 dark:bg-foreground/5 bg-white rounded-2xl p-4 duration-200 ease-in-out">
        <StatsSection name={name} />
        <UserOperationsSection name={name} />
      </div>

      <div className="flex flex-col gap-2">
        {connected ? (
          <Button
            onClick={isDeposit ? onStakeClick : onUnstakeClick}
            disabled={isPending || !amount}
          >
            {isDeposit ? "Deposit" : "Withdraw"}
          </Button>
        ) : (
          <Button onClick={() => setOpen(!open)}>Connect Wallet</Button>
        )}
      </div>

      {open && <WalletSelector open={open} setOpen={setOpen} />}
    </div>
  );
}
