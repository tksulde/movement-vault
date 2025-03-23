import { create } from "zustand";
import { getTokenData } from "@/action/view-functions/getTokenData";

export interface TokenData {
  decimals: number;
  icon_url: string;
  name: string;
  project_uri: string;
  symbol: string;
}

interface TokenDataState {
  tokenData: TokenData | null;
  isLoadingToken: boolean;
  fetchTokenData: () => Promise<void>;
}

export const useTokenStore2 = create<TokenDataState>((set) => ({
  tokenData: null,
  isLoadingToken: true,
  fetchTokenData: async () => {
    set({ isLoadingToken: true });
    try {
      const tokenData = await getTokenData("hstmove");
      set({ tokenData, isLoadingToken: false });
    } catch (error) {
      console.error("Failed to fetch token data:", error);
      set({ isLoadingToken: false });
    }
  },
}));
