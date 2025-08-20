import { create } from 'zustand';

type LetterStore = {
  selectedLetterId: string | null;
  setSelectedLetterId: (id: string) => void;
};

export const useLetterStore = create<LetterStore>(set => ({
  selectedLetterId: null,
  setSelectedLetterId: (id) => set({ selectedLetterId: id }),
}));