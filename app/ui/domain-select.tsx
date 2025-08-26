"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/select";
import Image from "next/image";
import React from "react";
import { FaEthereum, FaBtc } from "react-icons/fa6";
import { SiBinance, SiCardano } from "react-icons/si";

export default function DomainSelect() {
  const handleValueChange = (value: string) => {
    const selectedDomain = mainnet
      .flatMap((category) => category.items)
      .find((item) => item.name === value);
    if (selectedDomain?.link) {
      window.location.href = selectedDomain.link;
    }
  };

  return (
    <div>
      <Select defaultValue="Movement" onValueChange={handleValueChange}>
        <SelectTrigger className="w-[140px] focus-visible:ring-0 flex border-0">
          <SelectValue placeholder="Select a domain" />
        </SelectTrigger>
        <SelectContent className="dark:bg-black">
          {mainnet.map((domain) => (
            <SelectGroup key={domain.category}>
              <SelectLabel className="text-movement-600">
                {domain.category}
              </SelectLabel>
              {domain.items.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  <div className="flex items-center gap-1.5 text-foreground">
                    {item.icon} {item.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
          <div className="text-xs text-foreground/70 font-bold px-2 pt-2">
            Coming soon
          </div>
          {domains.map((domain) => (
            <SelectGroup key={domain.category}>
              <SelectLabel className="text-foreground/70">
                {domain.category}
              </SelectLabel>
              {domain.items.map((item) => (
                <SelectItem key={item.id} value={item.name} disabled>
                  <div className="flex items-center gap-1.5 text-foreground">
                    {item.icon} {item.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

const mainnet = [
  {
    category: "Testnet",
    items: [
      {
        id: 6,
        name: "Movement",
        link: "https://movement.eigenfi.io",
        icon: (
          <Image
            src={"/movement.svg"}
            className="w-4 h-4 dark:invert-0 invert"
            alt="movement"
            width={20}
            height={20}
          />
        ),
      },
      {
        id: 9,
        name: "ICP",
        link: "https://app.helixlabs.org",
        icon: (
          <Image
            src={"/icp-logo.png"}
            className="w-5 h-auto dark:invert-0 invert"
            alt="icp"
            width={20}
            height={20}
          />
        ),
      },
    ],
  },
];

const domains = [
  {
    category: "MVM",
    items: [
      {
        id: 5,
        name: "Aptos",
        link: "https://aptos.eigenfi.io",
        icon: (
          <Image
            src={"/aptos.svg"}
            className="w-4 h-4 dark:invert-0 invert"
            alt="aptos"
            width={20}
            height={20}
          />
        ),
      },
    ],
  },
  {
    category: "Non EVM",
    items: [
      {
        id: 2,
        name: "Cardano",
        link: "https://cardano.eigenfi.io",
        icon: <SiCardano className="w-4 h-4" />,
      },
    ],
  },
  {
    category: "EVM",
    items: [
      {
        id: 1,
        name: "Ethereum",
        link: "https://ethereum.eigenfi.io",
        icon: <FaEthereum />,
      },
      {
        id: 3,
        name: "BNB Chain",
        link: "https://bnb.eigenfi.io",
        icon: <SiBinance className="w-4 h-4" />,
      },
      {
        id: 4,
        name: "BitLayer",
        link: "https://bitlayer.eigenfi.io/",
        icon: <FaBtc className="w-4 h-4" />,
      },
    ],
  },
];
