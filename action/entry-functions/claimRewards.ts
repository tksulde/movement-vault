import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Claim all available rewards
 */
export const claimRewards = (name: string): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::${name}::claim_rewards`,
      functionArguments: [],
    },
  };
};
