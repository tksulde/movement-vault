/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { hstMOVE, REWARD_CREATOR_ADDRESS } from "@/lib/constant";
import { convertAmountFromOnChainToHumanReadable } from "@/lib/helpers";
import { getAccountTokenBalance } from "@/action/view-functions/getAccountTokenAmount";
import { getClaimableRewards } from "@/action/view-functions/getClaimableRewards";
import { getUserHasStake } from "@/action/view-functions/getUserHasStake";
import { getUserStakeData } from "@/action/view-functions/getUserStakeData";

interface AccountDataState {
  hasStake: boolean;
  hasRewards: boolean;
  claimableRewards: number;
  accountStakeAmount: number;
  isCreator: boolean;
  accountTokenBalance: number;
  isLoading: boolean;
  setLoading: (bool: boolean) => any;
  error: Error | null;
  fetchAccountData: (
    accountAddress: string,
    existsRewardSchedule: boolean
  ) => Promise<void>;
}

export const useAccountStore2 = create<AccountDataState>((set) => ({
  hasStake: false,
  hasRewards: false,
  claimableRewards: 0,
  accountStakeAmount: 0,
  isCreator: false,
  accountTokenBalance: 0,
  isLoading: false,
  setLoading: (bool) => {
    set({ isLoading: bool });
  },
  error: null,
  fetchAccountData: async (
    accountAddress: string,
    existsRewardSchedule: boolean
  ) => {
    set({ isLoading: true });
    try {
      if (!accountAddress) {
        set({
          hasStake: false,
          hasRewards: false,
          claimableRewards: 0,
          accountStakeAmount: 0,
          isCreator: false,
          accountTokenBalance: 0,
          isLoading: false,
          error: null,
        });
        return;
      }

      let claimableRewards = 0;
      if (existsRewardSchedule) {
        claimableRewards = await getClaimableRewards(accountAddress, hstMOVE);
      }

      const hasStake = await getUserHasStake(accountAddress, hstMOVE);

      let accountStakeAmount = 0;
      if (hasStake) {
        const accountStakeData = await getUserStakeData(
          accountAddress,
          hstMOVE
        );
        accountStakeAmount = convertAmountFromOnChainToHumanReadable(
          parseInt(accountStakeData?.amount ?? "0"),
          8
        );
      }

      const isCreator = accountAddress === REWARD_CREATOR_ADDRESS;

      const onChainBalance = await getAccountTokenBalance(
        accountAddress,
        "hstmove"
      );

      const accountTokenBalance = convertAmountFromOnChainToHumanReadable(
        onChainBalance,
        8
      );

      set({
        hasStake,
        hasRewards: claimableRewards > 0,
        claimableRewards,
        accountStakeAmount,
        isCreator,
        accountTokenBalance: Number(accountTokenBalance),
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({ error, isLoading: false });
    }
  },
}));
