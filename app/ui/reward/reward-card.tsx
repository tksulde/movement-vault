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
import { usePoolStore } from "@/store/usePoolStore";
import { toast } from "sonner";

export const RewardCard: React.FC = () => {
  const { signAndSubmitTransaction, account } = useWallet();
  const { tokenData, isLoadingToken } = useTokenStore();
  const { claimableRewards, fetchAccountData } = useAccountStore();
  const { fetchPoolData } = usePoolStore();

  const onClaimRewardsClick = async () => {
    const toastId = toast.loading(`Processing transaction...`);

    try {
      toast.loading(`Processing transaction...`, { id: toastId });
      const response = await signAndSubmitTransaction(claimRewards());

      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      toast.success("Rewards Claimed!", { id: toastId });
      fetchAccountData(account?.address.toString() ?? "", false);
      fetchPoolData();
    } catch (error: any) {
      toast.error("Failed to claim rewards", { id: toastId });
      console.log("error", error);
    }
  };

  const onStakeRewardsClick = async () => {
    const toastId = toast.loading(`Processing transaction...`);

    try {
      toast.loading(`Processing transaction...`, { id: toastId });
      const response = await signAndSubmitTransaction(compound());

      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      toast.success("Rewards Claimed!", { id: toastId });
      fetchAccountData(account?.address.toString() ?? "", false);
      fetchPoolData();
    } catch (error: any) {
      toast.error("Failed to claim rewards", { id: toastId });
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
