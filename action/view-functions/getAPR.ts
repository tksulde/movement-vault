/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getAPR = async (name: string): Promise<string> => {
  try {
    const apr = await aptosAction().view<[string]>({
      payload: {
        function: `${
          name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
        }::${name}::get_apr`,
        functionArguments: [],
      },
    });

    return apr[0];
  } catch (error) {
    return "0";
  }
};
