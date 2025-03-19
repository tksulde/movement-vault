/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getRewardReleased = async (): Promise<number> => {
  try {
    const rewardReleased = await aptosAction().view<[number]>({
      payload: {
        function: `${MODULE_ADDRESS}::eigenfi_vault_stMOVE::get_reward_released_so_far`,
        functionArguments: [],
      },
    });

    return rewardReleased[0];
  } catch (error: any) {
    return 0;
  }
};
