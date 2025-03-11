import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/ui/tabs";
import { Component as Chart1 } from "@/app/ui/chart-1";
import { Component2 as Chart2 } from "@/app/ui/chart-2";

export default function VaultTabs({ connected }: { connected: boolean }) {
  return (
    <div className="flex flex-col">
      <Tabs defaultValue="tab-1" className="items-center relative">
        <div className="absolute w-full border-b top-10" />
        <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="tab-1"
            className="text-base data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Vault
          </TabsTrigger>
          {connected && (
            <TabsTrigger
              value="tab-2"
              className="text-base data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              My Account
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="tab-1" className="py-4">
          <Chart1 />
        </TabsContent>
        {connected && (
          <TabsContent value="tab-2" className="py-4">
            <Chart2 />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
