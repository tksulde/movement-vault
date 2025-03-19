import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type CreateRewardScheduleArguments = {
  rps: number; // the reward per seconds
  durationInSeconds: number; // the reward schedule in seconds
};

/**
 * Create an incetivize pool
 */
export const createRewardSchedule = (
  args: CreateRewardScheduleArguments
): InputTransactionData => {
  const { rps, durationInSeconds } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::eigenfi_vault_stMOVE::create_reward_schedule`,
      functionArguments: [rps, durationInSeconds],
    },
  };
};
