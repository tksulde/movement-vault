import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type UnstakeArguments = {
  amount: number; // The TOKEN amount to unstake in smallest units
};

/**
 * Unstake an amount of token
 */
export const unstake = (args: UnstakeArguments): InputTransactionData => {
  const { amount } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::unstake`,
      functionArguments: [amount],
    },
  };
};
