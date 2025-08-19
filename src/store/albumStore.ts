import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Album } from '../api/album'

interface AlbumState {
  albumId?: number
  albumName?: string
  albumType?: string
  setAlbumMeta: (name?: string, type?: string) => void
  setAlbumId: (id?: number) => void
  setFromAlbum: (a: Pick<Album, 'id' | 'albumName' | 'albumType'>) => void
  clear: () => void
}

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set, get) => ({
      albumId: undefined,
      albumName: undefined,
      albumType: undefined,

      setAlbumMeta: (name, type) =>
        set((s) =>
          s.albumName === name && s.albumType === type
            ? s
            : { albumName: name, albumType: type }
        ),

      setAlbumId: (id) =>
        set((s) => (s.albumId === id ? s : { albumId: id })),


      setFromAlbum: (a) =>
        set((s) =>
          s.albumId === a.id &&
          s.albumName === a.albumName &&
          s.albumType === a.albumType
            ? s
            : { albumId: a.id, albumName: a.albumName, albumType: a.albumType }
        ),

      clear: () => set({ albumId: undefined, albumName: undefined, albumType: undefined }),
    }),
    {
      name: 'album-store',
      partialize: (state) => ({
        albumId: state.albumId,
        albumName: state.albumName,
        albumType: state.albumType,
      }),
    }
  )
)
