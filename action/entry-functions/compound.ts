import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
/**
 * Claim and stake rewards at the same operation
 */
export const compound = (name: string): InputTransactionData => {
  return {
    data: {
      function: `${
        name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
      }::${name}::compound`,
      functionArguments: [],
    },
  };
};
