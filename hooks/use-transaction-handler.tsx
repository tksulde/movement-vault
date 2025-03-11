/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useTransition, useCallback } from "react";
import { aptosAction } from "@/lib/aptosAction";
import { _depositEthereum, _withdrawEthereum } from "@/lib/axios/_actions";
import { useAccountStore } from "@/store/useAcountStore";
import { usePoolStore } from "@/store/usePoolStore";
import { toast } from "sonner";

interface UseTransactionHandlerProps {
  amount: string;
  isDeposit: boolean;
  address: string;
}

export function useTransactionHandler({
  amount,
  isDeposit,
  address,
}: UseTransactionHandlerProps) {
  const [isPending, startTransition] = useTransition();
  const [transactionHash, setTransactionHash] = useState("");

  const { fetchAccountData } = useAccountStore();
  const { fetchPoolData } = usePoolStore();

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
              });

              result = status;
              ResMessage = message;
            } else {
              const { status, message } = await _withdrawEthereum({
                address: address.toString(),
                amount: Number(amount || 0),
              });
              ResMessage = message;
              result = status;
            }

            if ([200, 201, 204].includes(result)) {
              toast.success(
                `${isDeposit ? "Deposit" : "Withdraw"} Successful!`,
                { id: toastId }
              );

              fetchAccountData(address, false);
              fetchPoolData();
              setTransactionHash(response.hash);
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
    [address, amount, fetchAccountData, fetchPoolData, isDeposit]
  );

  return {
    isPending,
    transactionHash,
    handleTransaction,
  };
}
