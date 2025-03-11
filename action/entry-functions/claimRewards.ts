import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Claim all available rewards
 */
export const claimRewards = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_vault::claim_reward`,
      functionArguments: [],
    },
  };
};
