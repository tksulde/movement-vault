"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/select";
const chartData = [
  { date: "2025-01-01", desktop: 222, mobile: 150 },
  { date: "2025-01-02", desktop: 97, mobile: 180 },
  { date: "2025-01-03", desktop: 167, mobile: 120 },
  { date: "2025-01-04", desktop: 242, mobile: 260 },
  { date: "2025-01-05", desktop: 373, mobile: 290 },
  { date: "2025-01-06", desktop: 301, mobile: 340 },
  { date: "2025-01-07", desktop: 245, mobile: 180 },
  { date: "2025-01-08", desktop: 409, mobile: 320 },
  { date: "2025-01-09", desktop: 59, mobile: 110 },
  { date: "2025-01-10", desktop: 261, mobile: 190 },
  { date: "2025-01-11", desktop: 327, mobile: 350 },
  { date: "2025-01-12", desktop: 292, mobile: 210 },
  { date: "2025-01-13", desktop: 342, mobile: 380 },
  { date: "2025-01-14", desktop: 137, mobile: 220 },
  { date: "2025-01-15", desktop: 120, mobile: 170 },
  { date: "2025-01-16", desktop: 138, mobile: 190 },
  { date: "2025-01-17", desktop: 446, mobile: 360 },
  { date: "2025-01-18", desktop: 364, mobile: 410 },
  { date: "2025-01-19", desktop: 243, mobile: 180 },
  { date: "2025-01-20", desktop: 89, mobile: 150 },
  { date: "2025-01-21", desktop: 137, mobile: 200 },
  { date: "2025-01-22", desktop: 224, mobile: 170 },
  { date: "2025-01-23", desktop: 138, mobile: 230 },
  { date: "2025-02-01", desktop: 222, mobile: 150 },
  { date: "2025-02-02", desktop: 97, mobile: 180 },
  { date: "2025-02-03", desktop: 167, mobile: 120 },
  { date: "2025-02-04", desktop: 242, mobile: 260 },
  { date: "2025-02-05", desktop: 373, mobile: 290 },
  { date: "2025-02-06", desktop: 301, mobile: 340 },
  { date: "2025-02-07", desktop: 245, mobile: 180 },
  { date: "2025-02-08", desktop: 409, mobile: 320 },
  { date: "2025-02-09", desktop: 59, mobile: 110 },
  { date: "2025-02-10", desktop: 261, mobile: 190 },
  { date: "2025-02-11", desktop: 327, mobile: 350 },
  { date: "2025-02-12", desktop: 292, mobile: 210 },
  { date: "2025-02-13", desktop: 342, mobile: 380 },
  { date: "2025-02-14", desktop: 137, mobile: 220 },
  { date: "2025-02-15", desktop: 120, mobile: 170 },
  { date: "2025-02-16", desktop: 138, mobile: 190 },
  { date: "2025-02-17", desktop: 446, mobile: 360 },
  { date: "2025-02-18", desktop: 364, mobile: 410 },
  { date: "2025-02-19", desktop: 243, mobile: 180 },
  { date: "2025-02-20", desktop: 89, mobile: 150 },
  { date: "2025-02-21", desktop: 137, mobile: 200 },
  { date: "2025-02-22", desktop: 224, mobile: 170 },

  { date: "2025-03-01", desktop: 222, mobile: 150 },
  { date: "2025-03-02", desktop: 97, mobile: 180 },
  { date: "2025-03-03", desktop: 167, mobile: 120 },
  { date: "2025-03-04", desktop: 242, mobile: 260 },
  { date: "2025-03-05", desktop: 373, mobile: 290 },
  { date: "2025-03-06", desktop: 301, mobile: 340 },
  { date: "2025-03-07", desktop: 245, mobile: 180 },
  { date: "2025-03-08", desktop: 409, mobile: 320 },
  { date: "2025-03-09", desktop: 59, mobile: 110 },
  { date: "2025-03-10", desktop: 261, mobile: 190 },
  { date: "2025-03-11", desktop: 327, mobile: 350 },
  { date: "2025-03-12", desktop: 292, mobile: 210 },
  { date: "2025-03-13", desktop: 342, mobile: 380 },
  { date: "2025-03-14", desktop: 137, mobile: 220 },
  { date: "2025-03-15", desktop: 120, mobile: 170 },
  { date: "2025-03-16", desktop: 138, mobile: 190 },
  { date: "2025-03-17", desktop: 446, mobile: 360 },
  { date: "2025-03-18", desktop: 364, mobile: 410 },
  { date: "2025-03-19", desktop: 243, mobile: 180 },
  { date: "2025-03-20", desktop: 89, mobile: 150 },
  { date: "2025-03-21", desktop: 137, mobile: 200 },
  { date: "2025-03-22", desktop: 224, mobile: 170 },
  { date: "2025-03-23", desktop: 138, mobile: 230 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "hstMove",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "stMove",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Component3() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2025-03-23");

    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="rounded-sm">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle> Movement Vault</CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-md sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-md">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-md">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-md">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-5)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-5)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-chart-5)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-chart-1)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
