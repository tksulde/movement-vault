/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getUserHasStake = async (
  accountAddress: string | undefined,
  name: string
): Promise<boolean> => {
  try {
    const userHasStaked = await aptosAction().view<[boolean]>({
      payload: {
        function: `${
          name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
        }::${name}::exists_user_stake`,
        functionArguments: [accountAddress],
      },
    });

    return userHasStaked[0];
  } catch (error: any) {
    return false;
  }
};
