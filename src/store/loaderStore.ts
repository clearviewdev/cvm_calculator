import { create } from 'zustand';

type State = {
  isLoading: boolean;
};

type Action = {
  setLoading: (state: boolean) => void;
};

const useLoaderStore = create<State & Action>((set) => ({
  isLoading: false,
  setLoading: (state) => set(() => ({ isLoading: state })),
}));

export default useLoaderStore;
