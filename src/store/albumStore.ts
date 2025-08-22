import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Album } from '../api/album'

interface AlbumState {
  albumId?: number
  albumName?: string
  albumType?: string
  description?: string
  setAlbumMeta: (name?: string, type?: string, description?: string) => void
  setAlbumId: (id?: number) => void
  setDescription: (desc?: string) => void
  setFromAlbum: (a: Pick<Album, 'id' | 'albumName' | 'albumType'> & { description?: string }) => void
  clear: () => void
}

export const useAlbumStore = create<AlbumState>()(
  persist(
    (set, get) => ({
      albumId: undefined,
      albumName: undefined,
      albumType: undefined,
      description: undefined,

      setAlbumMeta: (name, type, description) =>
        set((s) =>
          s.albumName === name && s.albumType === type && s.description === description
            ? s
            : { albumName: name, albumType: type, description }
        ),

      setAlbumId: (id) =>
        set((s) => (s.albumId === id ? s : { albumId: id })),

      setDescription: (desc) =>
        set((s) => (s.description === desc ? s : { description: desc })),

      setFromAlbum: (a) =>
        set((s) =>
          s.albumId === a.id &&
          s.albumName === a.albumName &&
          s.albumType === a.albumType &&
          s.description === a.description
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
    }),
    {
      name: 'album-store',
      partialize: (state) => ({
        albumId: state.albumId,
        albumName: state.albumName,
        albumType: state.albumType,
        description: state.description,
      }),
    }
  )
)
