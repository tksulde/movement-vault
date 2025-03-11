/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface User {
  id: number;
  address: string;
  points: number | null;
  lastPointUpdate: number;
  totalDeposited: number | null;
  totalWithdrawn: number | null;
  lockedAmount: number | null;
  contestInfo: any[];
}

interface DashboardStore {
  user: User;
  setUser: (user: User) => void;
  updateUserId: (id: number) => void;
  updateUserAddress: (address: string) => void;
  updateUserPoints: (points: number | null) => void;
  updateLastPointUpdate: (lastPointUpdate: number) => void;
  updateTotalDeposited: (totalDeposited: number | null) => void;
  updateTotalWithdrawn: (totalWithdrawn: number | null) => void;
  updateLockedAmount: (lockedAmount: number | null) => void;
  updateContestInfo: (contestInfo: any[]) => void;
  addContestInfo: (contestInfo: any) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  user: {
    id: 0,
    address: "",
    points: null,
    lastPointUpdate: 0,
    totalDeposited: null,
    totalWithdrawn: null,
    lockedAmount: null,
    contestInfo: [],
  },
  setUser: (user) => set(() => ({ user })),
  updateUserId: (id) => set((state) => ({ user: { ...state.user, id } })),
  updateUserAddress: (address) =>
    set((state) => ({ user: { ...state.user, address } })),
  updateUserPoints: (points) =>
    set((state) => ({ user: { ...state.user, points } })),
  updateLastPointUpdate: (lastPointUpdate) =>
    set((state) => ({ user: { ...state.user, lastPointUpdate } })),
  updateTotalDeposited: (totalDeposited) =>
    set((state) => ({ user: { ...state.user, totalDeposited } })),
  updateTotalWithdrawn: (totalWithdrawn) =>
    set((state) => ({ user: { ...state.user, totalWithdrawn } })),
  updateLockedAmount: (lockedAmount) =>
    set((state) => ({ user: { ...state.user, lockedAmount } })),
  updateContestInfo: (contestInfo) =>
    set((state) => ({ user: { ...state.user, contestInfo } })),
  addContestInfo: (newContestInfo) =>
    set((state) => ({
      user: {
        ...state.user,
        contestInfo: [...state.user.contestInfo, newContestInfo],
      },
    })),
}));
