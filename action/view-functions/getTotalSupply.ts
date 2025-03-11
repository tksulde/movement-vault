/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { FA_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getTotalSupply = async (): Promise<number> => {
  try {
    const totalSupply = await aptosAction().view<[{ vec: string }]>({
      payload: {
        function: "0x1::fungible_asset::supply",
        typeArguments: ["0x1::fungible_asset::Metadata"],
        functionArguments: [FA_ADDRESS],
      },
    });
    return parseInt(totalSupply[0].vec);
  } catch (error: any) {
    return 0;
  }
};
