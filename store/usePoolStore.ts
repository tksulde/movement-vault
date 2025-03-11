/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { convertAmountFromOnChainToHumanReadable } from "@/lib/helpers";
import { getAPR } from "@/action/view-functions/getAPR";
import { getExistsRewardSchedule } from "@/action/view-functions/getExistsRewardSchedule";
import { getRewardReleased } from "@/action/view-functions/getRewardReleased";
import { getRewardSchedule } from "@/action/view-functions/getRewardSchedule";
import { getStakePoolData } from "@/action/view-functions/getStakePoolData";
import { getTotalSupply } from "@/action/view-functions/getTotalSupply";

export interface GetRewardScheduleResponse {
  index: string;
  rps: string;
  last_update_ts: string;
  start_ts: string;
  end_ts: string;
}

interface PoolDataState {
  totalStaked: string;
  stakingRatio: string;
  apr: string;
  rewardReleased: string;
  uniqueStakers: string;
  existsRewardSchedule: boolean;
  rewardSchedule?: GetRewardScheduleResponse;
  isLoadingPool: boolean;
  error: Error | null;
  fetchPoolData: () => Promise<void>;
}

export const usePoolStore = create<PoolDataState>((set) => ({
  totalStaked: "0",
  stakingRatio: "0",
  apr: "0",
  rewardReleased: "0",
  uniqueStakers: "0",
  existsRewardSchedule: false,
  rewardSchedule: undefined,
  isLoadingPool: true,
  error: null,
  fetchPoolData: async () => {
    set({ isLoadingPool: true });
    try {
      const existsRewardSchedule = await getExistsRewardSchedule();

      if (!existsRewardSchedule) {
        set({
          totalStaked: "0",
          stakingRatio: "0",
          apr: "0",
          rewardReleased: "0",
          uniqueStakers: "0",
          existsRewardSchedule: false,
          rewardSchedule: undefined,
          isLoadingPool: false,
        });
        return;
      }

      const poolData = await getStakePoolData();
      const totalStaked = convertAmountFromOnChainToHumanReadable(
        Number.parseInt(poolData?.total_staked ?? "0"),
        8
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const uniqueStakers = poolData?.unique_stakers ?? "0";

      const totalSupply = await getTotalSupply();
      const stakingRatio =
        totalSupply > 0
          ? (
              (100 * Number.parseInt(poolData?.total_staked ?? "0")) /
              totalSupply
            ).toFixed(2)
          : "0";

      let rewardSchedule;
      if (existsRewardSchedule) {
        rewardSchedule = await getRewardSchedule();
      }

      const apr = await getAPR();
      const formattedAPR = Number.parseInt(apr).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const rewardReleasedFromChain = await getRewardReleased();
      const rewardReleased = convertAmountFromOnChainToHumanReadable(
        rewardReleasedFromChain ?? 0,
        8
      ).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      set({
        totalStaked,
        stakingRatio,
        apr: formattedAPR,
        rewardReleased,
        uniqueStakers,
        existsRewardSchedule,
        rewardSchedule,
        isLoadingPool: false,
        error: null,
      });
    } catch (error: any) {
      set({ error, isLoadingPool: false });
    }
  },
}));
