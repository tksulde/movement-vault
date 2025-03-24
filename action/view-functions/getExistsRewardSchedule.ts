/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getExistsRewardSchedule = async (
  name: string
): Promise<boolean> => {
  try {
    const existsRewardSchedule = await aptosAction().view<[boolean]>({
      payload: {
        function: `${
          name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
        }::${name}::exists_reward_schedule`,
      },
    });
    return existsRewardSchedule[0];
  } catch (error) {
    return false;
  }
};
