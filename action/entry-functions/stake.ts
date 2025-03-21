/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODULE_ADDRESS } from "@/lib/constant";

export type StakeTokenArguments = {
  amount: number; // The TOKEN amount to stake in smallest units
  account: any;
};

/**
 * Stake an amount of token
 */
export const stake = (args: StakeTokenArguments): any => {
  const { amount, account } = args;
  return {
    sender: account.address,
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_move_vault_stmove::stake`,
      functionArguments: [amount],
    },
  };
};
