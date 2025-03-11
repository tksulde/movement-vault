import { Skeleton } from "@/app/ui/skeleton";

export default function Statistics({
  stats,
  loading,
}: {
  stats: { label: string; value: string }[];
  loading: boolean;
}) {
  return (
    <div className="flex gap-6 justify-between">
      {loading
        ? [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex gap-2 mt-6 text-xl text-foreground/80 font-light"
            >
              <Skeleton className="h-[84px] w-[128px] bg-primary/10" />
            </div>
          ))
        : stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 mt-6 text-xl text-foreground/80 font-light"
            >
              <p>{stat.label}</p>
              <p className="text-3xl text-foreground">{stat.value}</p>
            </div>
          ))}
    </div>
  );
}
