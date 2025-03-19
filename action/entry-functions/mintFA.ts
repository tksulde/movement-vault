import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
// Internal utils
import { convertAmountFromHumanReadableToOnChain } from "@/lib/helpers";
import { MODULE_ADDRESS } from "@/lib/constant";

export type MintAssetArguments = {
  assetType: string;
  amount: number;
  decimals: number;
};

export const mintAsset = (args: MintAssetArguments): InputTransactionData => {
  const { assetType, amount, decimals } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::bardock_token_minting::mint_fa`,
      typeArguments: [],
      functionArguments: [
        assetType,
        convertAmountFromHumanReadableToOnChain(amount, decimals),
      ],
    },
  };
};
