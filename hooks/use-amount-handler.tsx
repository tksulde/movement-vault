import { useState, useCallback } from "react";

interface UseAmountHandlerProps {
  isWithdraw: boolean;
  accountStakeAmount: string;
  accountTokenBalance: string;
}

export function useAmountHandler({
  isWithdraw,
  accountStakeAmount,
  accountTokenBalance,
}: UseAmountHandlerProps) {
  const [amount, setAmount] = useState("");

  const removeCommas = useCallback((str: string) => str.replace(/,/g, ""), []);

  const handleAmountChange = useCallback(
    (value: string) => {
      if (value === "" || value === ".") {
        setAmount(value);
        return;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        return;
      }

      const maxValue = isWithdraw ? accountStakeAmount : accountTokenBalance;
      setAmount(
        numValue > parseFloat(removeCommas(maxValue)) ? maxValue : value
      );
    },
    [isWithdraw, accountStakeAmount, accountTokenBalance, removeCommas]
  );

  const setAmountFraction = useCallback(
    (fraction: number) => {
      const maxValue = isWithdraw ? accountStakeAmount : accountTokenBalance;
      setAmount((parseFloat(removeCommas(maxValue)) * fraction).toFixed(4));
    },
    [isWithdraw, accountStakeAmount, accountTokenBalance, removeCommas]
  );

  const max = useCallback(() => setAmountFraction(1), [setAmountFraction]);
  const half = useCallback(() => setAmountFraction(0.5), [setAmountFraction]);
  const quarter = useCallback(
    () => setAmountFraction(0.25),
    [setAmountFraction]
  );

  return {
    amount,
    setAmount,
    handleAmountChange,
    max,
    half,
    quarter,
  };
}
