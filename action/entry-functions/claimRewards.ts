import { MODULE_ADDRESS, MODULE_ADDRESS2, stMOVE } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Claim all available rewards
 */
export const claimRewards = (name: string): InputTransactionData => {
  return {
    data: {
      function: `${
        name === stMOVE ? MODULE_ADDRESS : MODULE_ADDRESS2
      }::${name}::claim_reward`,
      functionArguments: [],
    },
  };
};
