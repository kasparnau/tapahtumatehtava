import { create } from "zustand";

interface IUser {
  username: string;
}

interface IMainState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useMainStore = create<IMainState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
