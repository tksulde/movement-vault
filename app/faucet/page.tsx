import React from "react";
import { Button } from "../ui/button";

export default function Faucet() {
  return (
    <div className="p-12">
      <div className="flex gap-4 w-1/2 items-center">
        <div>stMOVE</div>
        <div>1000 </div>
        <Button>Claim</Button>
      </div>
    </div>
  );
}
