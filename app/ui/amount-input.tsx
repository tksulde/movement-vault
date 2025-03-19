import Image from "next/image";
import { Input } from "@/app/ui/input";
import { Button } from "@/app/ui/button";
import { Skeleton } from "@/app/ui/skeleton";
import { useCallback } from "react";

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  balance?: number;
  symbol: string;
  isLoading: boolean;
}

export default function AmountInput({
  amount,
  onChange,
  balance,
  symbol,
  isLoading,
}: AmountInputProps) {
  const handleChange = useCallback(
    (value: string) => {
      if (value === "" || value === ".") {
        onChange(value);
        return;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        return;
      }

      if (balance !== undefined && numValue > balance) {
        onChange(balance.toString());
      } else {
        onChange(value);
      }
    },
    [onChange, balance]
  );

  return (
    <div className="relative ease-in-out duration-300 rounded-2xl">
      <div className="absolute top-3 left-4 text-sm text-foreground/80">
        Amount
      </div>
      <Input
        id="amount"
        placeholder="0"
        type="number"
        value={amount}
        onChange={(e) => handleChange(e.target.value)}
        className="hover:bg-primary/5 dark:bg-foreground/5 bg-white border-0 rounded-2xl focus-visible:ring-offset-0 focus-visible:ring-[0.2px] h-[120px] py-[40px] px-4"
      />
      <div className="absolute top-3 right-5">
        <div className="flex items-center border rounded-full p-1 w-7 h-7 bg-primary">
          <Image
            src="/movement.svg"
            alt="icp"
            width={24}
            height={11.5}
            className="h-auto w-6 invert"
          />
        </div>
      </div>
      <div className="absolute flex gap-1 bottom-4 left-4 text-xs text-muted-foreground/50">
        <div>${Number(amount) * 0.446}</div>
      </div>
      <div className="absolute bottom-3 right-4 text-xs text-primary flex gap-0.5">
        <div className="py-1 text-foreground/80">
          {isLoading ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <span>
              {balance?.toString().slice(0, 8)} ${symbol}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => balance && onChange(balance.toString())}
        >
          MAX
        </Button>
      </div>
    </div>
  );
}
