"use client";

import { useCallback, useEffect } from "react";
import StakeDemo from "@/app/ui/stake";
import Statistics from "@/app/ui/stats";
import Animation from "@/app/ui/assets/star.json";
import VaultTabs from "@/app/ui/vault-tab-content";

import dynamic from "next/dynamic";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { usePoolStore } from "@/store/usePoolStore";
import { useTokenStore } from "@/store/useTokenStore";
import { useAccountStore } from "@/store/useAcountStore";
import { _getTransactions, _userDetail } from "@/lib/axios/_user_detail";
import { useDashboardStore } from "@/store/useDashboardStore";

const LottiePlayer = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const { account, connected } = useWallet();
  const { fetchTokenData } = useTokenStore();

  const { totalStaked, fetchPoolData, existsRewardSchedule, isLoadingPool } =
    usePoolStore();
  const { fetchAccountData, accountTokenBalance, isLoading, setLoading } =
    useAccountStore();

  const { setUser, updateTransactions } = useDashboardStore();

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

  const fetchPoolDataCallback = useCallback(async () => {
    setLoading(true);
    await fetchPoolData();
  }, [fetchPoolData, setLoading]);

  // Memoize the fetchAccountData function to prevent unnecessary recreations
  const fetchAccountDataCallback = useCallback(async () => {
    if (account?.address && !isLoadingPool) {
      await fetchAccountData(account.address.toString(), existsRewardSchedule);
    }
    setLoading(false);
  }, [
    account?.address,
    existsRewardSchedule,
    fetchAccountData,
    isLoadingPool,
    setLoading,
  ]);

  // Memoize the fetchTokenData function to prevent unnecessary recreations
  const fetchTokenDataCallback = useCallback(async () => {
    await fetchTokenData();
  }, [fetchTokenData]);

  // Fetch pool data on component mount
  useEffect(() => {
    fetchPoolDataCallback();
  }, [fetchPoolDataCallback]);

  // Fetch account data when account or pool data changes
  useEffect(() => {
    fetchAccountDataCallback();
  }, [fetchAccountDataCallback]);

  // Fetch token data on component mount
  useEffect(() => {
    fetchTokenDataCallback();
  }, [fetchTokenDataCallback]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (account?.address) {
        const { data } = await _userDetail({
          address: account?.address.toString(),
        });

        if (data) {
          setUser(data);
        }
      }
    };
    fetchUserDetails();
  }, [account?.address, setUser]);

  useEffect(() => {
    const fetch = async () => {
      const { data: transactionsData } = await _getTransactions({
        address: account?.address.toString() ?? "",
        limit: 20,
      });
      if (transactionsData?.transactions?.length > 0) {
        updateTransactions(transactionsData.transactions);
      }
    };
    fetch();
  }, [account?.address, updateTransactions]);

  return (
    <div className="md:gap-24 w-full grid lg:grid-cols-6 items-start p-6 md:p-10 pt-12 rounded-2xl">
      <div className="flex flex-col gap-12 col-span-4 w-full">
        <div className="text-4xl sm:text-6xl font-light relative overflow-hidden">
          Movement <span className="text-muted-foreground">Vault</span>
          <LottiePlayer
            animationData={Animation}
            loop={true}
            style={{ width: "192px", height: "192px" }}
            className="absolute -top-4 left-0 md:left-72"
          />
        </div>
        <p className="text-muted-foreground text-base md:text-lg font-light leading-6">
          Movement Vault is a next-generation liquid staking solution designed
          for the Movement Network, enabling seamless staking, liquidity
          provisioning, and interoperability within the Move ecosystem. Built by
          Helix Labs, Movement Vault empowers users to stake their assets while
          maintaining liquidity, optimizing yield generation, and enhancing
          capital efficiency across decentralized finance (DeFi) applications.
          {""}
        </p>
        <Statistics
          stats={connected ? statsWithBalance : stats}
          loading={isLoadingPool || isLoading}
        />
        <div className="block lg:hidden">
          <StakeDemo name="stmove" />
        </div>
        <VaultTabs connected={connected} />
      </div>
      <div className="max-w-[440px] mt-12 hidden lg:flex md:sticky top-5 col-span-2">
        <StakeDemo name="stmove" />
      </div>
    </div>
  );
}
