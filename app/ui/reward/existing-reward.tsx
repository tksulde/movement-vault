/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  convertAmountFromOnChainToHumanReadable,
  secondsToDate,
} from "@/lib/helpers";
import { Button } from "@/app/ui/button";
import { DialogTrigger } from "@/app/ui/dialog";

interface ExistingRewardScheduleProps {
  rewardSchedule: any;
}

export const ExistingRewardSchedule: React.FC<ExistingRewardScheduleProps> = ({
  rewardSchedule,
}) => {
  const getTotalRewardsInThePool = () => {
    const rps = parseInt(rewardSchedule?.rps ?? "0");
    const start_ts = parseInt(rewardSchedule?.start_ts ?? "0");
    const end_ts = parseInt(rewardSchedule?.end_ts ?? "0");
    return Math.ceil(
      convertAmountFromOnChainToHumanReadable((end_ts - start_ts) * rps, 0)
    ).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-foreground/70"> Total Rewards</p>
          <p className="text-lg"> {getTotalRewardsInThePool()}</p>
        </div>
        <div className="flex items-center w-full">
          <DialogTrigger asChild>
            <Button variant={"outline"} disabled={true} className="w-full">
              Incentivize
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-foreground/60 text-sm flex justify-between">
            Start date
            <span>
              {secondsToDate(
                parseInt(rewardSchedule?.start_ts ?? "0")
              ).toDateString()}
            </span>
          </p>
          <p className="text-foreground/60 text-sm flex justify-between">
            End date
            <span>
              {secondsToDate(
                parseInt(rewardSchedule?.end_ts ?? "0")
              ).toDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
