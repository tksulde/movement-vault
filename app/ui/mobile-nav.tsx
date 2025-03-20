"use client";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/app/ui/sheet";
import { MenuIcon } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import DomainSelect from "./domain-select";
import Link from "next/link";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent aria-describedby={undefined} side="right" className="p-4">
        <SheetTitle>
          <div className="flex gap-2 text-3xl font-normal items-center font-michroma">
            <div className="relative cursor-pointer items-center justify-center ">
              <p className="text-xl font-semibold">EigenFi</p>
              <p className="absolute flex  rounded-[5px] border border-foreground text-foreground top-[6px] -right-12 text-[10px] px-[3px] pb-0.5">
                move
              </p>
            </div>
          </div>
        </SheetTitle>
        <div className="mt-6 flex flex-col  w-full justify-between h-full">
          <div className="flex flex-col gap-2 w-full">
            <DomainSelect />
            <div className="flex items-center">
              <Link
                href="/faucet"
                className={`${cn(buttonVariants({ variant: "ghost" }))}`}
              >
                <div className="text-foreground duration-300 ease-in-out text-sm hover:text-foreground/70">
                  Faucet
                </div>
              </Link>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
