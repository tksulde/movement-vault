import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

/**
 * Claim all available rewards
 */
export const claimRewards = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::claim_reward`,
      functionArguments: [],
    },
  };
};
