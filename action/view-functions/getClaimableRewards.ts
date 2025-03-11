"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getClaimableRewards = async (
  accountAddress: string | undefined
): Promise<number> => {
  try {
    const rewards = await aptosAction().view<[number]>({
      payload: {
        function: `${MODULE_ADDRESS}::eigenfi_vault::get_claimable_reward`,
        functionArguments: [accountAddress],
      },
    });

    return rewards[0];
  } catch (error) {
    return 0;
  }
};
