import { create } from 'zustand';

interface IPaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  setTotalItems: (total: number) => void;
  resetPagination: () => void;
}

export const useCharactersPaginationStore = create<IPaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (count) => set({ itemsPerPage: count, currentPage: 1 }),
  setTotalItems: (total) => set({ totalItems: total }),
  resetPagination: () => set({ currentPage: 1 }),
}));
