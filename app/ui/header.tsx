import Link from "next/link";
import MobileNav from "@/app/ui/mobile-nav";
import DomainSelect from "@/app/ui/domain-select";
import ThemeToggle from "@/app/ui/theme-toggle";
import { WalletSelector } from "@/app/ui/wallet/wallet-selector";

export default function Header() {
  return (
    <div className="md:mx-10 mx-4 mt-3 px-6 rounded-2xl py-4 fixed top-0 left-0 bg-zinc-100 dark:bg-[#000000] right-0 z-50 flex justify-between items-center">
      <div className="flex gap-16 items-center">
        <div className="flex gap-2 text-3xl font-normal items-center font-michroma">
          <Link
            href="/"
            className="relative cursor-pointer items-center justify-center "
          >
            <p className="text-xl font-semibold">EigenFi</p>
            <p className="absolute sm:flex hidden rounded-[5px] border border-foreground text-foreground top-[6px] -right-12 text-[10px] px-[3px] pb-0.5">
              move
            </p>
          </Link>
        </div>
        <div className="hidden md:flex ps-4 gap-6 w-full items-center justify-center">
          <DomainSelect />
          <Link href="/faucet">
            <div className="text-foreground duration-300 ease-in-out text-sm hover:text-foreground/70">
              Faucet
            </div>
          </Link>
          <Link href="/litepaper.pdf" download={true}>
            <div className="text-foreground duration-300 ease-in-out text-sm hover:text-foreground/70">
              Litepaper
            </div>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <WalletSelector />
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
        <div className="md:hidden flex">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
