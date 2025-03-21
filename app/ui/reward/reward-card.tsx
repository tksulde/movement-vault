/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/app/ui/button";
import { aptosAction } from "@/lib/aptosAction";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { convertAmountFromOnChainToHumanReadable } from "@/lib/helpers";
import { claimRewards } from "@/action/entry-functions/claimRewards";
import { compound } from "@/action/entry-functions/compound";
import { Skeleton } from "@/app/ui/skeleton";
import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";
import { AudioLines, Sparkle } from "lucide-react";

export const RewardCard: React.FC = () => {
  const { signAndSubmitTransaction } = useWallet();
  const { tokenData, isLoadingToken } = useTokenStore();
  const { claimableRewards } = useAccountStore();

  const onClaimRewardsClick = async () => {
    try {
      const response = await signAndSubmitTransaction(claimRewards());

      // Wait for the transaction to be commited to chain
      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      // queryClient.refetchQueries();
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const onStakeRewardsClick = async () => {
    try {
      const response = await signAndSubmitTransaction(compound());

      // Wait for the transaction to be commited to chain
      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      // queryClient.refetchQueries();
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col w-full justify-between mt-4 space-y-4">
      <div className="flex justify-between">
        <p>Your Rewards</p>
        <div className="body-md-semibold flex gap-1 items-center">
          {convertAmountFromOnChainToHumanReadable(
            claimableRewards,
            tokenData?.decimals ?? 0
          )}
          <span className="text-muted-foreground/70 text-sm">
            {isLoadingToken ? (
              <Skeleton className="w-16 h-5 rounded-md" />
            ) : (
              ` $${tokenData?.symbol}`
            )}
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
