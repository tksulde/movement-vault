"use client";

import { useEffect } from "react";
import StakeDemo from "@/app/ui/stake";
import Statistics from "@/app/ui/stats";
import Animation from "@/app/ui/assets/star.json";
import VaultTabs from "@/app/ui/vault-tab-content";

import dynamic from "next/dynamic";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { usePoolStore } from "@/store/usePoolStore";
import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";

const LottiePlayer = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const { account, connected } = useWallet();
  const { fetchTokenData } = useTokenStore();

  const { totalStaked, fetchPoolData, existsRewardSchedule, isLoadingPool } =
    usePoolStore();
  const { fetchAccountData, accountTokenBalance, isLoading, setLoading } =
    useAccountStore();

  const stats = [
    {
      label: "Total Deposits",
      value: totalStaked ? totalStaked.toString() : "0",
    },
    { label: "Liquidity", value: "12.74k" },
    { label: "APY", value: "4.18%" },
  ];

  const statsWithBalance = [
    {
      label: "Total Deposits",
      value: totalStaked ? totalStaked.toString() : "0",
    },
    {
      label: "User Balance",
      value: accountTokenBalance ? accountTokenBalance.toString() : "0",
    },
    { label: "APY", value: "4.18%" },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetchPoolData();
    };

    fetchData();
  }, [fetchPoolData, setLoading]);

  useEffect(() => {
    if (account?.address && !isLoadingPool) {
      const fetchData = async () => {
        await fetchAccountData(
          account?.address.toString(),
          existsRewardSchedule
        );
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [
    account?.address,
    existsRewardSchedule,
    fetchAccountData,
    isLoadingPool,
    setLoading,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTokenData();
    };

    fetchData();
  }, [fetchTokenData]);

  return (
    <div className="flex gap-24 w-full items-start p-10 pt-12 rounded-2xl">
      <div className="flex flex-col gap-12">
        <div className="text-6xl font-light relative overflow-hidden">
          Movement <span className="text-muted-foreground">Vault</span>
          <LottiePlayer
            animationData={Animation}
            loop={true}
            style={{ width: "192px", height: "192px" }}
            className="absolute -top-4 left-72"
          />
        </div>
        <p className="text-muted-foreground text-lg font-light leading-6">
          The ICP Vault is a decentralized platform that allows users to store
          their ICP tokens in a secure and accessible manner. With the ICP
          Vault, users can easily transfer their ICP tokens to other users,
          enabling seamless and secure transactions.
        </p>
        <Statistics
          stats={connected ? statsWithBalance : stats}
          loading={isLoadingPool || isLoading}
        />
        <VaultTabs connected={connected} />
      </div>
      <div className="w-[740px] mt-12 sticky top-5">
        <StakeDemo />
      </div>
    </div>
  );
}
