"use server";

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getClaimableRewards = async (
  accountAddress: string | undefined,
  name: string
): Promise<number> => {
  try {
    const rewards = await aptosAction().view<[number]>({
      payload: {
        function: `${MODULE_ADDRESS}::${name}::get_claimable_reward`,
        functionArguments: [accountAddress],
      },
    });

    return rewards[0];
  } catch (error) {
    console.log(error);
    return 0;
  }
};
