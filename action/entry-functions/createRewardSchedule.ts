import { MODULE_ADDRESS } from "@/lib/constant";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

export type CreateRewardScheduleArguments = {
  rps: number; // the reward per seconds
  durationInSeconds: number; // the reward schedule in seconds
  name: string;
};

/**
 * Create an incetivize pool
 */
export const createRewardSchedule = (
  args: CreateRewardScheduleArguments
): InputTransactionData => {
  const { rps, durationInSeconds, name } = args;
  return {
    data: {
      function: `${MODULE_ADDRESS}::${name}::create_reward_schedule`,
      functionArguments: [rps, durationInSeconds],
    },
  };
};
