/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODULE_ADDRESS } from "@/lib/constant";

export type StakeTokenArguments = {
  amount: number; // The TOKEN amount to stake in smallest units
  account: any;
  name: string;
};

/**
 * Stake an amount of token
 */
export const stake = (args: StakeTokenArguments): any => {
  const { amount, account, name } = args;

  return {
    sender: account.address,
    data: {
      function: `${MODULE_ADDRESS}::${name}::stake`,
      functionArguments: [amount],
    },
  };
};
