import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type UnstakeArguments = {
  amount: number; // The TOKEN amount to unstake in smallest units
  name: string;
};

/**
 * Unstake an amount of token
 */
export const unstake = (args: UnstakeArguments): InputTransactionData => {
  const { amount, name } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::${name}::unstake`,
      functionArguments: [amount],
    },
  };
};
