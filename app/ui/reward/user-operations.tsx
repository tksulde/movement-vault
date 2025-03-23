import React from "react";

import { useAccountStore } from "@/store/useAcountStore";
import { RewardCard } from "@/app/ui/reward/reward-card";
import { AddIncentivePoolDialog } from "@/app/ui/reward/add-pool-card";
import { useAccountStore2 } from "@/store/useAcountStore2";

interface UserOperationsSectionProps {
  className?: string;
  name: string;
}

export const UserOperationsSection: React.FC<UserOperationsSectionProps> =
  React.memo(({ className = "", name }) => {
    const store1 = useAccountStore();
    const store2 = useAccountStore2();

    let hasRewards = false;
    let isCreator = false;

    if (name === "stmove") {
      hasRewards = store1.hasRewards;
      isCreator = store1.isCreator;
    } else {
      hasRewards = store2.hasRewards;
      isCreator = store2.isCreator;
    }

    return (
      <div className={`w-full space-y-4 ${className}`}>
        {hasRewards && <RewardCard name={name} aria-label="Your rewards" />}
        {isCreator && (
          <AddIncentivePoolDialog name={name} aria-label="Add incentive pool" />
        )}
      </div>
    );
  });

UserOperationsSection.displayName = "UserOperationsSection";
