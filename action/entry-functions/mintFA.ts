import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
// Internal utils
import { convertAmountFromHumanReadableToOnChain } from "@/lib/helpers";
import { FA_ADDRESS, MODULE_ADDRESS } from "@/lib/constant";

export type MintAssetArguments = {
  amount: number;
  decimals: number;
};

export const mintAsset = (args: MintAssetArguments): InputTransactionData => {
  const { amount, decimals } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::bardock_token_minting::mint_fa`,
      typeArguments: [],
      functionArguments: [
        FA_ADDRESS,
        convertAmountFromHumanReadableToOnChain(amount, decimals),
      ],
    },
  };
};
