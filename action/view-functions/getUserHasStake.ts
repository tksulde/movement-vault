/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getUserHasStake = async (
  accountAddress: string | undefined
): Promise<boolean> => {
  try {
    const userHasStaked = await aptosAction().view<[boolean]>({
      payload: {
        function: `${MODULE_ADDRESS}::eigenfi_vault::exists_user_stake`,
        functionArguments: [accountAddress],
      },
    });

    return userHasStaked[0];
  } catch (error: any) {
    return false;
  }
};
