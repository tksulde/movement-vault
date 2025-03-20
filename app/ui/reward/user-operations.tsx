import React from "react";

import { useAccountStore } from "@/store/useAcountStore";
import { RewardCard } from "@/app/ui/reward/reward-card";
import { AddIncentivePoolDialog } from "@/app/ui/reward/add-pool-card";

interface UserOperationsSectionProps {
  className?: string;
}

export const UserOperationsSection: React.FC<UserOperationsSectionProps> =
  React.memo(({ className = "" }) => {
    const { hasRewards, isCreator } = useAccountStore();

    return (
      <div className={`w-full space-y-4 ${className}`}>
        {hasRewards && <RewardCard aria-label="Your rewards" />}
        {isCreator && (
          <AddIncentivePoolDialog aria-label="Add incentive pool" />
        )}
      </div>
    );
  });

UserOperationsSection.displayName = "UserOperationsSection";
