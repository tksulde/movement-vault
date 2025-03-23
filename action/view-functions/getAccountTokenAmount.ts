"use server";

import { FA_ADDRESS, FA_ADDRESS2 } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export const getAccountTokenBalance = async (
  accountAddress: string | undefined,
  name: string
): Promise<number> => {
  if (!accountAddress) return 0;
  try {
    const balance = await aptosAction().view<[number]>({
      payload: {
        function: "0x1::primary_fungible_store::balance",
        typeArguments: ["0x1::object::ObjectCore"],
        functionArguments: [
          accountAddress,
          name === "stmove" ? FA_ADDRESS : FA_ADDRESS2,
        ],
      },
    });
    return balance[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 0;
  }
};
