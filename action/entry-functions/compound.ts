import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
/**
 * Claim and stake rewards at the same operation
 */
export const compound = (name: string): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::${name}::compound`,
      functionArguments: [],
    },
  };
};
