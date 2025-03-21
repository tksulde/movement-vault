"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/dialog";
import { Button } from "@/app/ui/button";
import { ExistingRewardSchedule } from "@/app/ui/reward/existing-reward";
import { IncentiveForm } from "@/app/ui/reward/incentive-form";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { createRewardSchedule } from "@/action/entry-functions/createRewardSchedule";
import { aptosAction } from "@/lib/aptosAction";
import { convertAmountFromHumanReadableToOnChain } from "@/lib/helpers";

import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";
import { usePoolStore } from "@/store/usePoolStore";

const WEEKS_IN_SECONDS = 604800;

export const AddIncentivePoolDialog: React.FC = () => {
  const { signAndSubmitTransaction } = useWallet();
  const { tokenData } = useTokenStore();
  const { accountTokenBalance } = useAccountStore();
  const { existsRewardSchedule, rewardSchedule } = usePoolStore();
  // const queryClient = useQueryClient();

  const [incentiveAmount, setIncentiveAmount] = useState<string>("");
  const [weeks, setWeeks] = useState<string>("");

  const onAddIncentive = async () => {
    const incentiveAmountInChainUnit = convertAmountFromHumanReadableToOnChain(
      parseInt(incentiveAmount),
      tokenData?.decimals ?? 0
    );
    const durationInSeconds = parseInt(weeks) * WEEKS_IN_SECONDS;
    const rps = Math.floor(incentiveAmountInChainUnit / durationInSeconds);

    try {
      const response = await signAndSubmitTransaction(
        createRewardSchedule({ rps, durationInSeconds })
      );
      await aptosAction().waitForTransaction({
        transactionHash: response.hash,
      });
      // queryClient.refetchQueries();
    } catch (error) {
      console.error("Failed to add incentive:", error);
    }
  };

  return (
    <Dialog>
      <div className="mt-4">
        {existsRewardSchedule ? (
          <ExistingRewardSchedule
            rewardSchedule={rewardSchedule}
            tokenData={tokenData}
          />
        ) : (
          <div className="flex flex-row w-full justify-between">
            <div>
              <p>Available {tokenData?.name} Rewards </p>
              <p className="body-md-semibold">{accountTokenBalance}</p>
            </div>
            <DialogTrigger asChild>
              <Button>Incentivize</Button>
            </DialogTrigger>
          </div>
        )}
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <IncentiveForm
          weeks={weeks}
          setWeeks={setWeeks}
          incentiveAmount={incentiveAmount}
          setIncentiveAmount={setIncentiveAmount}
          tokenData={tokenData}
          accountTokenBalance={accountTokenBalance}
          onAddIncentive={onAddIncentive}
          existsRewardSchedule={existsRewardSchedule}
        />
      </DialogContent>
    </Dialog>
  );
};
