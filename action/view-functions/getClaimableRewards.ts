"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getClaimableRewards = async (
  accountAddress: string | undefined,
  name: string
): Promise<number> => {
  try {
    const rewards = await aptosAction().view<[number]>({
      payload: {
        function: `${MODULE_ADDRESS}::${name}::get_claimable_rewards`,
        functionArguments: [accountAddress],
      },
    });

    return rewards[0];
  } catch (error) {
    return 0;
  }
};
