/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/card";
import { aptosAction } from "@/lib/aptosAction";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { convertAmountFromOnChainToHumanReadable } from "@/lib/helpers";
import { claimRewards } from "@/action/entry-functions/claimRewards";
import { compound } from "@/action/entry-functions/compound";
import { Skeleton } from "@/app/ui/skeleton";
import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";

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
    <Card className="rounded-3xl">
      <CardContent className="px-5 py-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row gap-6">
            <div>
              <p>Your Rewards</p>
              <p className="body-md-semibold pb-2">
                {convertAmountFromOnChainToHumanReadable(
                  claimableRewards,
                  tokenData?.decimals ?? 0
                )}
                {isLoadingToken ? (
                  <Skeleton className="w-16 h-5 rounded-md" />
                ) : (
                  ` ${tokenData?.symbol}`
                )}
              </p>
              <p className="text-foreground/60 text-sm">
                Stake rewards will auto claim your available rewards and stake
                them
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="border-gray border-2 flex items-center"
              onClick={onClaimRewardsClick}
            >
              Claim Rewards
            </Button>
            <Button
              className="border-gray border-2 flex items-center"
              onClick={onStakeRewardsClick}
            >
              Stake Rewards
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
