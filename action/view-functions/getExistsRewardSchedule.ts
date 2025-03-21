/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getExistsRewardSchedule = async (): Promise<boolean> => {
  try {
    const existsRewardSchedule = await aptosAction().view<[boolean]>({
      payload: {
        function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::exists_reward_schedule`,
      },
    });
    return existsRewardSchedule[0];
  } catch (error) {
    return false;
  }
};
