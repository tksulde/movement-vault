/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/app/ui/button";
import { aptosAction } from "@/lib/aptosAction";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  convertAmountFromHumanReadableToOnChain,
  convertAmountFromOnChainToHumanReadable,
} from "@/lib/helpers";
import { claimRewards } from "@/action/entry-functions/claimRewards";
import { compound } from "@/action/entry-functions/compound";
import { Skeleton } from "@/app/ui/skeleton";
import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";
import { AudioLines, Sparkle } from "lucide-react";
import { usePoolStore } from "@/store/usePoolStore";
import { toast } from "sonner";
import { useTokenStore2 } from "@/store/useTokenStore2";
import { usePoolStore2 } from "@/store/usePoolStore2";
import { useAccountStore2 } from "@/store/useAcountStore2";
import { hstMOVE, stMOVE } from "@/lib/constant";
import { _depositEthereum } from "@/lib/axios/_actions";

export const RewardCard = ({ name }: { name: string }) => {
  const { signAndSubmitTransaction, account } = useWallet();
  const { tokenData, isLoadingToken } = useTokenStore();
  const { claimableRewards, fetchAccountData } = useAccountStore();
  const { fetchPoolData } = usePoolStore();

  const { tokenData: tokenData2, isLoadingToken: isLoadingToken2 } =
    useTokenStore2();
  const {
    claimableRewards: claimableRewards2,
    fetchAccountData: fetchAccountData2,
  } = useAccountStore2();
  const { fetchPoolData: fetchPoolData2 } = usePoolStore2();

  const onClaimRewardsClick = async () => {
    const toastId = toast.loading(`Processing transaction...`);

    try {
      toast.loading(`Processing transaction...`, { id: toastId });
      const response = await signAndSubmitTransaction(
        claimRewards(name === "stmove" ? stMOVE : hstMOVE)
      );

      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      toast.success("Rewards Claimed!", { id: toastId });

      if (name === "stmove") {
        fetchAccountData(account?.address.toString() ?? "", false);
        fetchPoolData();
      } else {
        fetchAccountData2(account?.address.toString() ?? "", false);
        fetchPoolData2();
      }
    } catch (error: any) {
      toast.error("Failed to claim rewards", { id: toastId });
      console.log("error", error);
    }
  };

  const onStakeRewardsClick = async () => {
    const toastId = toast.loading(`Processing transaction...`);

    try {
      toast.loading(`Processing transaction...`, { id: toastId });
      const response = await signAndSubmitTransaction(
        compound(name === "stmove" ? stMOVE : hstMOVE)
      );

      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });

      const { status, message } = await _depositEthereum({
        address: account?.address.toString() ?? "",
        amount:
          name === `stmove`
            ? claimableRewards * 10 ** 8
            : claimableRewards2 * 10 ** 8,
        transactionHash: response.hash,
        tokenId: name === "stmove" ? "stmove" : "hstmove",
      });

      if ([200, 201, 204].includes(status)) {
        toast.success("Rewards Claimed!", { id: toastId });

        if (name === "stmove") {
          fetchAccountData(account?.address.toString() ?? "", false);
          fetchPoolData();
        } else {
          fetchAccountData2(account?.address.toString() ?? "", false);
          fetchPoolData2();
        }
      } else {
        toast.error(message, {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error("Failed to claim rewards", { id: toastId });
      console.log("error", error);
    }
  };

  console.log("claimableRewards", claimableRewards);

  return (
    <div className="flex flex-col w-full justify-between mt-4 space-y-4">
      <div className="flex justify-between">
        <p>Your Rewards</p>
        <div className="body-md-semibold flex gap-1 items-center">
          {convertAmountFromOnChainToHumanReadable(
            name === "stmove" ? claimableRewards : claimableRewards2,
            8
          )}
          <span className="text-muted-foreground/70 text-sm">
            {name == "stmove" &&
              (isLoadingToken ? (
                <Skeleton className="w-16 h-5 rounded-md" />
              ) : (
                ` $${tokenData?.symbol}`
              ))}
            {name !== "stmove" &&
              (isLoadingToken2 ? (
                <Skeleton className="w-16 h-5 rounded-md" />
              ) : (
                ` $${tokenData2?.symbol}`
              ))}
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full gap-4">
        <Button
          variant={"outline"}
          onClick={onClaimRewardsClick}
          className="w-1/2"
        >
          <Sparkle />
          Claim Rewards
        </Button>
        <Button
          variant={"outline"}
          onClick={onStakeRewardsClick}
          className="w-1/2"
        >
          <AudioLines />
          Stake Rewards
        </Button>
      </div>
    </div>
  );
};
