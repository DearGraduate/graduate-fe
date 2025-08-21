import { create } from 'zustand';

type LetterData = {
  id: string;
  writerName: string;
  message: string;
  isPublic: boolean;
  picUrl?: string;
};

type LetterStore = {
  selectedLetterId: string | null;
  selectedLetterData: LetterData | null;
  setSelectedLetterId: (id: string) => void;
  setSelectedLetterData: (data: LetterData) => void;
};

export const useLetterStore = create<LetterStore>(set => ({
  selectedLetterId: null,
  selectedLetterData: null,
  setSelectedLetterId: (id) => set({ selectedLetterId: id }),
  setSelectedLetterData: (data) => set({ selectedLetterData: data }),
}));