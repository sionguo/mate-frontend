import { create } from 'zustand';

interface TestStore {
  count: number;
  setCount: (count: number) => void;
}

export const useCounter = create<TestStore>(set => ({
  count: 1,
  setCount: count => {
    set({ count: count });
  },
}));
