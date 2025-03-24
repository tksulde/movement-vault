import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
// Internal utils
import { convertAmountFromHumanReadableToOnChain } from "@/lib/helpers";
import {
  FA_ADDRESS,
  FA_ADDRESS2,
  MODULE_ADDRESS,
  MODULE_ADDRESS2,
} from "@/lib/constant";

export type MintAssetArguments = {
  amount: number;
  decimals: number;
  name: string;
};

export const mintAsset = (args: MintAssetArguments): InputTransactionData => {
  const { amount, decimals, name } = args;
  return {
    data: {
      function: `${
        name === "stmove" ? MODULE_ADDRESS : MODULE_ADDRESS2
      }::eigenfi_token_minter::mint_fa`,
      typeArguments: [],
      functionArguments: [
        name === "stmove" ? FA_ADDRESS : FA_ADDRESS2,
        convertAmountFromHumanReadableToOnChain(amount, decimals),
      ],
    },
  };
};
