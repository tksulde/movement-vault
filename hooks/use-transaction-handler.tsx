/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useTransition, useCallback } from "react";
import { aptosAction } from "@/lib/aptosAction";
import { _depositEthereum, _withdrawEthereum } from "@/lib/axios/_actions";
import { useAccountStore } from "@/store/useAcountStore";
import { usePoolStore } from "@/store/usePoolStore";
import { toast } from "sonner";
import { _getTransactions } from "@/lib/axios/_user_detail";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { usePoolStore2 } from "@/store/usePoolStore2";
import { useAccountStore2 } from "@/store/useAcountStore2";

interface UseTransactionHandlerProps {
  amount: string;
  isDeposit: boolean;
  address: string;
  name: string;
}

export function useTransactionHandler({
  amount,
  isDeposit,
  address,
  name,
}: UseTransactionHandlerProps) {
  const [isPending, startTransition] = useTransition();
  const [transactionHash, setTransactionHash] = useState("");

  const { account } = useWallet();

  const { fetchAccountData } = useAccountStore();
  const { fetchPoolData } = usePoolStore();

  const { fetchPoolData: fetchHst } = usePoolStore2();
  const { fetchAccountData: fetchHstAccount } = useAccountStore2();

  const { updateTransactions } = useDashboardStore();

  const handleTransaction = useCallback(
    async (transactionFunction: () => Promise<any>) => {
      if (!amount) return;
      const toastId = toast.loading(`Processing transaction...`);

      startTransition(async () => {
        toast.loading(`Processing transaction...`, { id: toastId });
        try {
          const response = await transactionFunction();

          if (response) {
            await aptosAction().waitForTransaction({
              transactionHash: response.hash,
            });

            let result;
            let ResMessage;

            if (isDeposit) {
              const { status, message } = await _depositEthereum({
                address: address.toString(),
                amount: Number(amount || 0),
                transactionHash: response.hash,
                tokenId: name === "stmove" ? "stmove" : "hstmove",
              });

              result = status;
              ResMessage = message;
            } else {
              const { status, message } = await _withdrawEthereum({
                address: address.toString(),
                amount: Number(amount || 0),
                tokenId: name === "stmove" ? "stmove" : "hstmove",
              });
              ResMessage = message;
              result = status;
            }

            if ([200, 201, 204].includes(result)) {
              toast.success(
                `${isDeposit ? "Deposit" : "Withdraw"} Successful!`,
                { id: toastId }
              );

              if (name === "stmove") {
                fetchAccountData(address, false);
                fetchPoolData();
              } else {
                fetchHstAccount(address, false);
                fetchHst();
              }

              setTransactionHash(response.hash);
              const { data } = await _getTransactions({
                address: account?.address.toString() ?? "",
                limit: 20,
              });
              if (data?.transactions?.length > 0) {
                updateTransactions(data.transactions);
              }
            } else {
              toast.error(ResMessage, {
                id: toastId,
              });
            }
          } else {
            toast.error(`${response.message}`, {
              id: toastId,
            });
          }
        } catch (error: any) {
          toast.error(error, {
            id: toastId,
          });
        }
      });
      setTransactionHash("");
    },
    [
      account?.address,
      address,
      amount,
      fetchAccountData,
      fetchHst,
      fetchHstAccount,
      fetchPoolData,
      isDeposit,
      name,
      updateTransactions,
    ]
  );

  return {
    isPending,
    transactionHash,
    handleTransaction,
  };
}
