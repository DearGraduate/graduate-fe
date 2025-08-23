// store/albumStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Album } from '../api/album';

type AlbumState = {
  albumId?: number;
  albumName?: string;
  albumType?: string;
  description?: string;

  // 게스트 락(세션 동안만, persist에 포함 X)
  _guestLock?: boolean;

  setAlbumMeta: (name?: string, type?: string, description?: string) => void;
  setAlbumId: (id?: number) => void;
  setDescription: (desc?: string) => void;
  setFromAlbum: (a: Pick<Album, 'id' | 'albumName' | 'albumType'> & { description?: string }) => void;
  clear: () => void;

  // 게스트 전용 액션(락을 걸면서 세팅)
  setAlbumIdFromGuest: (id?: number) => void;
  setFromAlbumFromGuest: (a: Pick<Album, 'id' | 'albumName' | 'albumType'> & { description?: string }) => void;

  // 락 해제(작성 끝/페이지 떠날 때 호출)
  clearGuestLock: () => void;
};

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set, get) => ({
      albumId: undefined,
      albumName: undefined,
      albumType: undefined,
      description: undefined,

      // 일반 setter들은 게스트 락이 걸려 있으면 무시
      setAlbumMeta: (name, type, description) =>
        set((s) =>
          s._guestLock
            ? s
            : s.albumName === name && s.albumType === type && s.description === description
            ? s
            : { albumName: name, albumType: type, description }
        ),

      setAlbumId: (id) =>
        set((s) => (s._guestLock || s.albumId === id ? s : { albumId: id })),

      setDescription: (desc) =>
        set((s) => (s._guestLock || s.description === desc ? s : { description: desc })),

      setFromAlbum: (a) =>
        set((s) =>
          s._guestLock ||
          (s.albumId === a.id &&
            s.albumName === a.albumName &&
            s.albumType === a.albumType &&
            s.description === a.description)
            ? s
            : {
                albumId: a.id,
                albumName: a.albumName,
                albumType: a.albumType,
                description: a.description,
              }
        ),

      clear: () =>
        set({
          albumId: undefined,
          albumName: undefined,
          albumType: undefined,
          description: undefined,
        }),

      // ---------- 게스트 전용 setter (락을 걸면서 강제 세팅) ----------
      setAlbumIdFromGuest: (id) =>
        set(() => ({ _guestLock: true, albumId: id })),

      setFromAlbumFromGuest: (a) =>
        set(() => ({
          _guestLock: true,
          albumId: a.id,
          albumName: a.albumName,
          albumType: a.albumType,
          description: a.description,
        })),

      clearGuestLock: () => set((s) => (s._guestLock ? { _guestLock: undefined } : s)),
    }),
    {
      name: 'album-store',
      // guestLock은 퍼시스트하지 않음
      partialize: (state) => ({
        albumId: state.albumId,
        albumName: state.albumName,
        albumType: state.albumType,
        description: state.description,
      }),
    }
  )
);
