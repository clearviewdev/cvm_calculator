import { create } from 'zustand';

type State = {
  isLoggedIn: boolean;
};

type Action = {
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<State & Action>((set) => ({
  isLoggedIn: false,
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false })),
}));

export default useAuthStore;
