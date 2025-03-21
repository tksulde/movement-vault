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

  const { account } = useWallet();

  const { fetchAccountData } = useAccountStore();
  const { fetchPoolData } = usePoolStore();
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
            console.log("Response", response);
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
              const { status, message, data } = await _withdrawEthereum({
                address: address.toString(),
                amount: Number(amount || 0),
              });
              console.log("data", data);
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
      fetchPoolData,
      isDeposit,
      updateTransactions,
    ]
  );

  return {
    isPending,
    transactionHash,
    handleTransaction,
  };
}
