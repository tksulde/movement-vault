/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getRewardReleased = async (name: string): Promise<number> => {
  try {
    const rewardReleased = await aptosAction().view<[number]>({
      payload: {
        function: `${
          name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
        }::${name}::get_reward_released_so_far`,
        functionArguments: [],
      },
    });

    return rewardReleased[0];
  } catch (error: any) {
    return 0;
  }
};
