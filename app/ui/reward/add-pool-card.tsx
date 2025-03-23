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

import { useTokenStore2 } from "@/store/useTokenStore2";
import { useAccountStore2 } from "@/store/useAcountStore2";
import { usePoolStore2 } from "@/store/usePoolStore2";
import { hstMOVE, stMOVE } from "@/lib/constant";

const WEEKS_IN_SECONDS = 604800;

export const AddIncentivePoolDialog = ({ name }: { name: string }) => {
  const { signAndSubmitTransaction } = useWallet();

  const { tokenData } = useTokenStore();
  const { accountTokenBalance } = useAccountStore();
  const { existsRewardSchedule, rewardSchedule } = usePoolStore();

  const { tokenData: tokenData2 } = useTokenStore2();
  const { accountTokenBalance: accountTokenBalance2 } = useAccountStore2();
  const {
    existsRewardSchedule: existsRewardSchedule2,
    rewardSchedule: rewardSchedule2,
  } = usePoolStore2();

  const [incentiveAmount, setIncentiveAmount] = useState<string>("");
  const [weeks, setWeeks] = useState<string>("");

  const onAddIncentive = async () => {
    const incentiveAmountInChainUnit = convertAmountFromHumanReadableToOnChain(
      parseInt(incentiveAmount),
      name === "stmove" ? tokenData?.decimals ?? 0 : tokenData2?.decimals ?? 0
    );
    const durationInSeconds = parseInt(weeks) * WEEKS_IN_SECONDS;
    const rps = Math.floor(incentiveAmountInChainUnit / durationInSeconds);

    try {
      const response = await signAndSubmitTransaction(
        createRewardSchedule({
          rps,
          durationInSeconds,
          name: name === "stmove" ? stMOVE : hstMOVE,
        })
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
        {name === "stmove" ? (
          existsRewardSchedule ? (
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
          )
        ) : existsRewardSchedule2 ? (
          <ExistingRewardSchedule
            rewardSchedule={rewardSchedule2}
            tokenData={tokenData2}
          />
        ) : (
          <div className="flex flex-row w-full justify-between">
            <div>
              <p>Available {tokenData2?.name} Rewards </p>
              <p className="body-md-semibold">{accountTokenBalance2}</p>
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
          tokenData={name === "stmove" ? tokenData : tokenData2}
          accountTokenBalance={
            name === "stmove" ? accountTokenBalance : accountTokenBalance2
          }
          onAddIncentive={onAddIncentive}
          existsRewardSchedule={
            name === "stmove" ? existsRewardSchedule : existsRewardSchedule2
          }
        />
      </DialogContent>
    </Dialog>
  );
};
