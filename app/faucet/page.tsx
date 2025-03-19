"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/app/ui/button";
import { mintAsset } from "@/action/entry-functions/mintFA";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Faucet() {
  const { connected, signAndSubmitTransaction } = useWallet();
  const [isPending, startTransition] = useTransition();

  const mint = async () => {
    const toastId = toast.loading(`Processing transaction...`);
    startTransition(async () => {
      toast.loading(`Processing transaction...`, { id: toastId });
      const res = await signAndSubmitTransaction(
        mintAsset({
          amount: 100,
          decimals: 8,
        })
      );
      toast.success("100 stMOVE Claimed!", { id: toastId });
      confettiEffect();
      console.log("res", res, isPending);
    });
  };

  const confettiEffect = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="p-12">
      {connected && (
        <div className="flex gap-4 w-1/2 mx-auto items-center">
          <div>stMOVE</div>
          <div>100 </div>
          <Button onClick={mint}>Claim</Button>
        </div>
      )}
    </div>
  );
}
