import "./globals.css";
import type { Metadata } from "next";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/app/ui/sonner";
import { ReactScan } from "@/app/ui/react-scan";
import { ScrollArea } from "@/app/ui/scroll-area";
import WalletProvider from "@/app/ui/aptos-provider";
import { ThemeProvider } from "@/app/ui/theme-wrapper";
import { geistMono, geistSans, fontMichroma } from "@/app/ui/assets/font";

export const metadata: Metadata = {
  title: "EigenFi - Movement Vault",
  description:
    "EigenFi is a web3 application that allows users to stake their tokens and earn yields on their staked assets.",
  keywords: [
    "EigenFi",
    "Movement",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan />
      <body
        className={`${geistSans.className} ${geistMono.variable} ${fontMichroma.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <div className="flex flex-col justify-center min-h-screen px-10">
              <Header />
              <ScrollArea className="flex flex-col justify-center h-[82svh] bg-zinc-100 dark:bg-[#000000] mt-8 items-center rounded-2xl">
                {children}
              </ScrollArea>
              <Footer />

              <Toaster />
              <Analytics />
            </div>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
