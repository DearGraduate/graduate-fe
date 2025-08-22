import { createAlbum, getAlbum, updateAlbum, deleteAlbum } from '../api/album'
import { useAlbumStore } from '../store/albumStore'
import type { CreateAlbumRequest, Album } from '../api/album'

let isFetching = false // 중복 호출 방지

export const albumService = {
  async fetch(force = false): Promise<Album | null> {
    if (isFetching && !force) return null
    isFetching = true
    try {
      const album = await getAlbum()
      if (album) {
        useAlbumStore.getState().setFromAlbum(album)
      }
      return album
    } catch (e) {
      console.error('[albumService.fetch] failed:', e)
      return null
    } finally {
      isFetching = false
    }
  },

  async create(data: CreateAlbumRequest) {
    try {
      const res = await createAlbum(data)
      if (res?.isSuccess) {
        useAlbumStore.getState().setAlbumMeta(data.albumName, data.albumType)
      }
      return res
    } catch (e) {
      console.error('[albumService.create] failed:', e)
      return { isSuccess: false, error: e }
    }
  },

  async update(data: CreateAlbumRequest) {
    try {
      const res = await updateAlbum(data)
      if (res?.isSuccess) {
        useAlbumStore.getState().setAlbumMeta(data.albumName, data.albumType)
      }
      return res
    } catch (e) {
      console.error('[albumService.update] failed:', e)
      return { isSuccess: false, error: e }
    }
  },

  async remove() {
    try {
      const res = await deleteAlbum()
      if (res?.isSuccess) {
        useAlbumStore.getState().clear()
      }
      return res
    } catch (e) {
      console.error('[albumService.remove] failed:', e)
      return { isSuccess: false, error: e }
    }
  },
}
