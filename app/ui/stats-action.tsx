import React from "react";
import { Skeleton } from "@/app/ui/skeleton";
import { usePoolStore } from "@/store/usePoolStore";
import { usePoolStore2 } from "@/store/usePoolStore2";

interface StatItemProps {
  title: string;
  value: string | number | undefined;
}

export const StatsSection = ({ name }: { name: string }) => {
  const store1 = usePoolStore();
  const store2 = usePoolStore2();

  let stakingRatio = null;
  let apr = null;
  let rewardReleased = null;
  let uniqueStakers = null;
  let isLoadingPool = false;

  if (name === "stmove") {
    stakingRatio = store1.stakingRatio;
    apr = store1.apr;
    rewardReleased = store1.rewardReleased;
    uniqueStakers = store1.uniqueStakers;
    isLoadingPool = store1.isLoadingPool;
  } else {
    stakingRatio = store2.stakingRatio;
    apr = store2.apr;
    rewardReleased = store2.rewardReleased;
    uniqueStakers = store2.uniqueStakers;
    isLoadingPool = store2.isLoadingPool;
  }

  const stats: StatItemProps[] = React.useMemo(
    () => [
      {
        title: "Unique Stakers",
        value: uniqueStakers,
      },
      {
        title: "Protocol Staking Ratio",
        value: `${stakingRatio}%`,
      },
      {
        title: "Rewards Released So Far",
        value: rewardReleased,
      },
      {
        title: "APR",
        value: `${apr}%`,
      },
    ],
    [uniqueStakers, stakingRatio, rewardReleased, apr]
  );

  if (isLoadingPool) {
    return (
      <section className="w-full">
        <ul className="flex flex-col gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <li className="basis-1/3 text-foreground/60" key={i}>
                <Skeleton className="h-4 w-full" />
              </li>
            ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="w-full">
      <ul className="flex flex-col gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="flex justify-between">
            <p className="text-foreground/70">{stat.title}</p>
            <p className="text-lg">{stat.value}</p>
          </div>
        ))}
      </ul>
    </section>
  );
};
