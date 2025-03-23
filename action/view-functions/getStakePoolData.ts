/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export interface StakePoolDataResponse {
  fa_metadata_object: string;
  reward_store: string;
  total_staked: string;
  unique_stakers: string;
}

export const getStakePoolData = async (
  name: string
): Promise<StakePoolDataResponse | null> => {
  try {
    const stakePoolOnChainData = await aptosAction().view<string[]>({
      payload: {
        function: `${MODULE_ADDRESS}::${name}::get_stake_pool_data`,
        functionArguments: [],
      },
    });
    const stakePoolData = {
      fa_metadata_object: stakePoolOnChainData[0],
      reward_store: stakePoolOnChainData[1],
      total_staked: stakePoolOnChainData[2],
      unique_stakers: stakePoolOnChainData[3],
    };

    return stakePoolData;
  } catch (error: any) {
    return null;
  }
};
