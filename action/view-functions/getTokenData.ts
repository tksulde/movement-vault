"use server";

import { FA_ADDRESS, FA_ADDRESS2 } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export interface TokenDataResponse {
  decimals: number;
  icon_url: string;
  name: string;
  project_uri: string;
  symbol: string;
}

export const getTokenData = async (
  name: string
): Promise<TokenDataResponse | null> => {
  try {
    const onChainTokenData = await aptosAction().view<[TokenDataResponse]>({
      payload: {
        function: "0x1::fungible_asset::metadata",
        typeArguments: ["0x1::object::ObjectCore"],
        functionArguments: [name === "stmove" ? FA_ADDRESS : FA_ADDRESS2],
      },
    });

    return onChainTokenData[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
