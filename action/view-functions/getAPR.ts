/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { MODULE_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getAPR = async (): Promise<string> => {
  try {
    const apr = await aptosAction().view<[string]>({
      payload: {
        function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::get_apr`,
        functionArguments: [],
      },
    });

    return apr[0];
  } catch (error) {
    return "0";
  }
};
