import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
/**
 * Claim and stake rewards at the same operation
 */
export const compound = (): InputTransactionData => {
  return {
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::compound`,
      functionArguments: [],
    },
  };
};
