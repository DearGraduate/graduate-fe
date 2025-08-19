import { createAlbum, getAlbum, updateAlbum, deleteAlbum } from '../api/album'
import { useAlbumStore } from '../store/albumStore'
import type { CreateAlbumRequest, Album } from '../api/album'

export const albumService = {
  async fetch(): Promise<Album | null> {
    try {
      const album = await getAlbum() 
      if (album) {
        useAlbumStore.getState().setFromAlbum(album)
      }
      return album
    } catch (e) {
      console.error('[albumService.fetch] failed:', e)
      return null
    }
  },

  async create(data: CreateAlbumRequest) {
    const res = await createAlbum(data)
    if (res?.isSuccess) {
      useAlbumStore.getState().setAlbumMeta(data.albumName, data.albumType)
    }
    return res
  },

  async update(data: CreateAlbumRequest) {
    const res = await updateAlbum(data)
    if (res?.isSuccess) {
      useAlbumStore.getState().setAlbumMeta(data.albumName, data.albumType)
    }
    return res
  },

  async remove() {
    const res = await deleteAlbum()
    if (res?.isSuccess) {
      useAlbumStore.getState().clear()
    }
    return res
  },
}
