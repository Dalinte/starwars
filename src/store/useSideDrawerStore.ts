import { create } from 'zustand';
import type { ReactNode } from 'react';

interface SideDrawerStore {
  isOpen: boolean;
  content: ReactNode | null;
  setDrawerValues: (values: Partial<SideDrawerStore>) => void;
}

export const useSideDrawerStore = create<SideDrawerStore>(set => ({
  isOpen: false,
  content: null,
  setDrawerValues: values => set(values),
}));
