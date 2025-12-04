import { useSideDrawerStore } from '@/stores/useSideDrawerStore';
import type { ReactNode } from 'react';

export const useSideDrawer = () => {
  const { isOpen, content, setDrawerValues } = useSideDrawerStore();

  return {
    isOpen,
    content,
    openDrawer: () => setDrawerValues({ isOpen: true }),
    openDrawerWithContent: (content: ReactNode) => setDrawerValues({ isOpen: true, content }),
    closeDrawer: () => setDrawerValues({ isOpen: false }),
  };
};
