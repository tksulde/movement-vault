/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export interface RewardsScheduleReponse {
  index: string;
  rps: string;
  last_update_ts: string;
  start_ts: string;
  end_ts: string;
}

export const getRewardSchedule = async (
  name: string
): Promise<RewardsScheduleReponse | undefined> => {
  try {
    const response = await aptosAction().view<string[]>({
      payload: {
        function: `${MODULE_ADDRESS}::${name}::get_reward_schedule`,
      },
    });

    const rewardsSchedule = {
      index: response[0],
      rps: response[1],
      last_update_ts: response[2],
      start_ts: response[3],
      end_ts: response[4],
    };

    return rewardsSchedule;
  } catch (error: any) {
    return undefined;
  }
};
