import DomainSelect from "@/app/ui/domain-select";
import ThemeToggle from "@/app/ui/theme-toggle";
import { WalletSelector } from "@/app/ui/wallet-connect/wallet-selector";

export default function Header() {
  return (
    <div className="mx-10 mt-3 px-6 rounded-2xl py-4 fixed top-0 left-0 bg-zinc-100 dark:bg-[#000000] right-0 z-50 flex justify-between items-center">
      <div className="flex gap-16 items-center">
        <div className="flex gap-2 text-3xl font-normal items-center font-michroma">
          <div className="relative cursor-pointer items-center justify-center ">
            <p className="text-xl font-semibold">EigenFi</p>
            <p className="absolute rounded-[5px] border border-foreground text-foreground top-[6px] -right-12 text-[10px] px-[3px] pb-0.5">
              move
            </p>
          </div>
        </div>
        <DomainSelect />
      </div>
      <div className="flex gap-3 items-center">
        <WalletSelector />
        <ThemeToggle />
      </div>
    </div>
  );
}
