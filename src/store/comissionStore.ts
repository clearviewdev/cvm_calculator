import { create } from 'zustand';
import { Item } from '../types/Item';

type State = {
  items: Item[];
};

type Action = {
  setItems: (items: Item[]) => void;
  removeItem: (id: string) => void;
};

const useComissionStore = create<State & Action>((set) => ({
  items: [],
  setItems: (items) => set(() => ({ items })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
}));

export default useComissionStore;
