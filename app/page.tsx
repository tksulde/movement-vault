"use client";

import React, { useCallback, useEffect } from "react";
import { Component3 } from "@/app/ui/chart-3";
import Image from "next/image";
import Link from "next/link";
import GradientText from "@/app/ui/gradient-text";
import { usePoolStore } from "@/store/usePoolStore";
import { Skeleton } from "./ui/skeleton";
import { usePoolStore2 } from "@/store/usePoolStore2";

export default function Home() {
  const { totalStaked, fetchPoolData, isLoadingPool, apr } = usePoolStore();
  const {
    totalStaked: hstStaked,
    fetchPoolData: fetchHst,
    isLoadingPool: isLoadingHst,
    apr: hstApr,
  } = usePoolStore2();

  const fetchPoolDataCallback = useCallback(async () => {
    await fetchPoolData();
  }, [fetchPoolData]);
  const fetchHstCallback = useCallback(async () => {
    await fetchHst();
  }, [fetchHst]);

  useEffect(() => {
    fetchPoolDataCallback();
  }, [fetchPoolDataCallback]);

  useEffect(() => {
    fetchHstCallback();
  }, [fetchHstCallback]);

  function formatNumber(num: number) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }

  return (
    <div className="md:p-12">
      <div className="bg-background rounded-md w-full lg:flex-row flex-col flex gap-6 lg:gap-12 justify-between md:p-6">
        <div className="w-full xl:w-7/12 p-8 rounded-sm bg-background flex flex-col gap-6 justify-between">
          <GradientText>
            <p className="text-6xl font-thin">Helix Vault</p>
          </GradientText>
          <div className="flex items-center gap-2 justify-between">
            <div className="flex flex-col gap-2 justify-between">
              <p className="text-sm text-foreground/70">Total Deposits</p>
              <div className="text-5xl">
                {isLoadingPool || isLoadingHst ? (
                  <Skeleton className="h-8 w-32" />
                ) : (
                  formatNumber(
                    parseFloat(totalStaked.replace(/,/g, "")) +
                      parseFloat(hstStaked.replace(/,/g, ""))
                  )
                )}
              </div>
            </div>{" "}
          </div>
          <Component3 />
        </div>
        <div className="w-full xl:w-5/12 p-8 flex flex-col gap-8 h-full">
          <Link
            prefetch
            href="/stmove"
            className="p-8 group rounded-sm border flex flex-col gap-6 cursor-pointer transition-all"
          >
            <div className="flex items-center group-hover:text-primary font-michroma duration-150 ease-in-out gap-4">
              <Image
                src="/helix.png"
                alt="icp"
                width={24}
                height={11.5}
                className="h-auto w-8 ms-2"
              />
              <div className="relative cursor-pointer items-center justify-center">
                <p className="text-lg font-semibold ">Helix Vault</p>
              </div>
            </div>
            <div className="py-2 px-3 bg-zinc-100 dark:bg-black rounded-md flex flex-col gap-2">
              <div className="flex justify-between border-b py-2">
                <div className="w-1/2 border-r ">
                  <p className="text-foreground/70 text-sm">Vault</p>{" "}
                  <p> stMOVE</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-foreground/70 text-sm">Total Deposits</p>{" "}
                  <div className="text-end w-full">
                    {isLoadingPool ? (
                      <Skeleton className="h-4 w-24" />
                    ) : (
                      totalStaked
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-foreground/70 text-sm">Apr</p>{" "}
                <div>
                  {isLoadingPool ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    apr + "%"
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-foreground/70 text-sm">Network</p>{" "}
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
            </div>
          </Link>
          <Link
            href="/hstmove"
            className="p-8 group rounded-sm border flex flex-col gap-6 cursor-pointer transition-all"
          >
            <div className="flex items-center group-hover:text-primary font-michroma duration-150 ease-in-out gap-4">
              <Image
                src="/helix-white.png"
                alt="icp"
                width={24}
                height={11.5}
                className="h-auto w-8 ms-2 dark:invert-0 invert"
              />
              <div className="relative cursor-pointer items-center justify-center">
                <p className="text-lg font-semibold ">Helix Vault</p>
              </div>
            </div>
            <div className="py-2 px-3 bg-zinc-100 dark:bg-black rounded-md flex flex-col gap-2">
              <div className="flex justify-between border-b py-2">
                <div className="w-1/2 border-r ">
                  <p className="text-foreground/70 text-sm">Vault</p>{" "}
                  <p> hstMOVE</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-foreground/70 text-sm">Total Deposits</p>{" "}
                  <div className="text-end w-full">
                    {isLoadingHst ? (
                      <Skeleton className="h-4 w-24" />
                    ) : (
                      hstStaked
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-foreground/70 text-sm">Apr</p>{" "}
                <div>
                  {isLoadingHst ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    hstApr + "%"
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-foreground/70 text-sm">Network</p>{" "}
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
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
