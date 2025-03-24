/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export interface UserStakeData {
  amount: string;
  last_claim_ts: string;
  index: string;
}

export const getUserStakeData = async (
  accountAddress: string | undefined,
  name: string
): Promise<UserStakeData | null> => {
  try {
    const userOnChainStakeData = await aptosAction().view<string[]>({
      payload: {
        function: `${
          name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
        }::${name}::get_user_stake_data`,
        functionArguments: [accountAddress],
      },
    });

    const userStakeData = {
      amount: userOnChainStakeData[0],
      last_claim_ts: userOnChainStakeData[1],
      index: userOnChainStakeData[2],
    };

    return userStakeData;
  } catch (error: any) {
    return null;
  }
};
