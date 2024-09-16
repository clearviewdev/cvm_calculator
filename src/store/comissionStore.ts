import { create } from 'zustand';
import { Field, Item } from '../types/Item';

type State = {
  items: Item[];
  fields: Field[];
};

type Action = {
  setItems: (items: Item[]) => void;
  setFields: (fields: Field[]) => void;
  removeItem: (id: string) => void;
};

const useComissionStore = create<State & Action>((set) => ({
  items: [],
  fields: [],
  setItems: (items) => set(() => ({ items })),
  setFields: (fields) => set(() => ({ fields })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
}));

export default useComissionStore;
