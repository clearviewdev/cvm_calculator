import { create } from 'zustand';

type State = {
  showModal: boolean;
  editId: string | null;
  policyName: string | null;
};

type Action = {
  setEdit: (id?: string | null, name?: string) => void;
  completeEdit: () => void;
};

const useInputModalStore = create<State & Action>((set) => ({
  showModal: false,
  editId: null,
  policyName: null,
  setEdit: (id, name) =>
    set(() => ({ showModal: true, editId: id, policyName: name })),
  completeEdit: () =>
    set(() => ({ showModal: false, editId: null, policyName: null })),
}));

export default useInputModalStore;
