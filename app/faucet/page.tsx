"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/app/ui/button";
import { mintAsset } from "@/action/entry-functions/mintFA";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";

export default function Faucet() {
  const { connected, signAndSubmitTransaction } = useWallet();
  const [isPending, startTransition] = useTransition();

  const mint = async () => {
    const toastId = toast.loading(`Processing transaction...`);

    startTransition(async () => {
      toast.loading(`Processing transaction...`, { id: toastId });

      try {
        const res = await signAndSubmitTransaction(
          mintAsset({
            amount: 1000,
            decimals: 8,
          })
        );
        console.log("res", res);
        toast.success("100 stMOVE Claimed!", { id: toastId });
        confettiEffect();
      } catch (err) {
        console.log("err", err);
        toast.error("Failed to claim 100 stMOVE", { id: toastId });
      }
      console.log("res", isPending);
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
    <div className="p-6 md:p-12 flex gap-6">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="w-full max-w-md mx-auto bg-card text-card-foreground shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Token Faucet</CardTitle>
              <CardDescription>
                Claim test tokens for development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {connected && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-2">
                      <Image
                        alt="stMove"
                        src={"/movement-primary.svg"}
                        width={100}
                        height={100}
                        className="w-6 h-6"
                      />
                      <div className="flex gap-2">
                        stMOVE <span>(movement testnet):</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <span>100 </span> $stMOVE
                    </div>
                  </div>
                  <Button onClick={mint}>Claim Staked Tokens</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Why Use EigenFi?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Reward System: Users earn Helix points and native LST/LRT
                  yields by staking compatible assets in the Helix Vault.
                </li>
                <li>
                  Purpose of Dual Reward: Enhances liquidity and provides
                  additional utility for L1 assets.
                </li>
                <li>Easy-to-use interface</li>
                <li>Supported Networks: Multiple L1s.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Connect your wallet</li>
                <li>Click &quot;Claim Staked Tokens&quot;</li>
                <li>Use the tokens in your testnet environment</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* <div className="flex gap-4 w-1/2 items-center justify-between border py-2 px-4 rounded-md">
        <div className="flex gap-2">
          <div>100 </div>
          <div>lstMOVE</div>
        </div>
        <Button onClick={mint} disabled>
          Claim
        </Button>
      </div> */}
    </div>
  );
}
