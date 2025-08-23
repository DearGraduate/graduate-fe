// store/guestAlbumStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type GuestAlbumState = {
  albumId?: number;
  albumName?: string;
  albumType?: string;
  description?: string;
  pendingRedirect?: string; 

  setFromAlbum: (a: { id: number; albumName?: string; albumType?: string; description?: string }) => void;
  setPendingRedirect: (to?: string) => void;

  // 로그인 성공 시 한 번에 꺼내 쓰고 비우기
  consume: () => {
    albumId?: number;
    albumName?: string;
    albumType?: string;
    description?: string;
    pendingRedirect?: string;
  } | null;

  clear: () => void;
};

export const useGuestAlbumStore = create<GuestAlbumState>()(
  persist(
    (set, get) => ({
      albumId: undefined,
      albumName: undefined,
      albumType: undefined,
      description: undefined,
      pendingRedirect: undefined,

      setFromAlbum: (a) =>
        set({
          albumId: a.id,
          albumName: a.albumName,
          albumType: a.albumType,
          description: a.description,
        }),

      setPendingRedirect: (to) => set({ pendingRedirect: to }),

      consume: () => {
        const s = get();
        set({
          albumId: undefined,
          albumName: undefined,
          albumType: undefined,
          description: undefined,
          pendingRedirect: undefined,
        });
        return s.albumId
          ? {
              albumId: s.albumId,
              albumName: s.albumName,
              albumType: s.albumType,
              description: s.description,
              pendingRedirect: s.pendingRedirect,
            }
          : s.pendingRedirect
          ? { pendingRedirect: s.pendingRedirect }
          : null;
      },

      clear: () =>
        set({
          albumId: undefined,
          albumName: undefined,
          albumType: undefined,
          description: undefined,
          pendingRedirect: undefined,
        }),
    }),
    {
      name: 'guest-album-store',
      storage: createJSONStorage(() => sessionStorage), // 탭 단위 유지
      partialize: (s) => ({
        albumId: s.albumId,
        albumName: s.albumName,
        albumType: s.albumType,
        description: s.description,
        pendingRedirect: s.pendingRedirect,
      }),
    }
  )
);
