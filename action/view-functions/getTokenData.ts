"use server";

import { FA_ADDRESS } from "@/lib/constant";
import { aptosAction } from "@/lib/aptosAction";

export interface TokenDataResponse {
  decimals: number;
  icon_url: string;
  name: string;
  project_uri: string;
  symbol: string;
}

export const getTokenData = async (): Promise<TokenDataResponse | null> => {
  try {
    const onChainTokenData = await aptosAction().view<[TokenDataResponse]>({
      payload: {
        function: "0x1::fungible_asset::metadata",
        typeArguments: ["0x1::object::ObjectCore"],
        functionArguments: [FA_ADDRESS],
      },
    });

    return onChainTokenData[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
