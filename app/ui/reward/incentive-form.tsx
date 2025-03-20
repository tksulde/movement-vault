/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Label } from "@/app/ui/label";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Card, CardContent } from "@/app/ui/card";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/ui/dialog";
import { convertAmountFromOnChainToHumanReadable } from "@/lib/helpers";

const WEEKS_IN_SECONDS = 604800;

interface IncentiveFormProps {
  weeks: string;
  setWeeks: (weeks: string) => void;
  incentiveAmount: string;
  setIncentiveAmount: (amount: string) => void;
  tokenData: any;
  accountTokenBalance: number;
  onAddIncentive: () => void;
  existsRewardSchedule: boolean;
}

export const IncentiveForm: React.FC<IncentiveFormProps> = ({
  weeks,
  setWeeks,
  incentiveAmount,
  setIncentiveAmount,
  tokenData,
  accountTokenBalance,
  onAddIncentive,
  existsRewardSchedule,
}) => {
  const [isValidMinimalIncentiveAmount, setIsValidMinimalIncentiveAmount] =
    useState(true);
  const [
    minimalIncentiveAmountInHumanReadable,
    setMinimalIncentiveAmountInHumanReadable,
  ] = useState(0);

  const validateMinimalIncentiveAmount = (weeks: string) => {
    const weeksInSeconds = parseInt(weeks) * WEEKS_IN_SECONDS;
    const minimalIncentiveAmountInHumanReadable = Math.ceil(
      convertAmountFromOnChainToHumanReadable(weeksInSeconds, 0)
    );
    // tokenData?.decimals ??
    setMinimalIncentiveAmountInHumanReadable(
      minimalIncentiveAmountInHumanReadable
    );
    setIsValidMinimalIncentiveAmount(
      minimalIncentiveAmountInHumanReadable >= 1
    );
  };

  const onWeeksDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weeks = e.target.value;
    setWeeks(weeks);
    validateMinimalIncentiveAmount(weeks);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Incentivize Pool</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4 space-y-4">
        <Card>
          <CardContent className="px-4 py-4 space-y-6">
            <div className="flex flex-col item-center space-y-2">
              <Label htmlFor="weeks">Duration</Label>
              <p className="text-foreground/60 text-sm">
                Define how many weeks your incentive will be distributed
                linearly.
              </p>
            </div>
            <div className="flex flex-col item-center space-y-2">
              <Label htmlFor="weeks">Weeks</Label>
              <Input
                id="weeks"
                value={weeks}
                className="col-span-3"
                type="number"
                onChange={onWeeksDurationChange}
              />
              {!isValidMinimalIncentiveAmount && weeks && (
                <p className="text-foreground/60 text-sm">
                  Minimal incentive should be greater than 0, try increasing the
                  weeks duration
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col item-center space-y-2">
          <Label htmlFor="incentive-amount">Incentive Amount</Label>
          <Input
            id="incentive-amount"
            className="col-span-3"
            type="number"
            value={incentiveAmount}
            onChange={(e) => setIncentiveAmount(e.target.value)}
          />
          <p className="text-foreground/60 text-sm">
            {accountTokenBalance} {tokenData?.name} Available in your wallet
          </p>
          {incentiveAmount &&
            parseInt(incentiveAmount) <
              minimalIncentiveAmountInHumanReadable && (
              <p className="text-foreground/60 text-sm">
                Minimum Incentive amount should be{" "}
                {minimalIncentiveAmountInHumanReadable}
              </p>
            )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={onAddIncentive} disabled={existsRewardSchedule}>
            Add Incentive
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};
