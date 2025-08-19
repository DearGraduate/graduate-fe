// api/albums.ts
import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const BASE_URL = process.env.REACT_APP_BASE_URL!
const withBearer = (t: string) => (t.startsWith('Bearer ') ? t : `Bearer ${t}`)


export type Empty = Record<string, never>

export interface ApiResponse<T> {
  isSuccess: boolean
  code: string
  message: string
  result: T
}

export interface CreateAlbumRequest {
  graduationDate: string
  albumName: string
  albumType: string
  description: string
}

export interface Album {
  id: number
  albumName: string
  albumType: string
  description: string
  graduationDate: string  
  createdAt: string     
}


//앨범 생성
export const createAlbum = async (
  data: CreateAlbumRequest
): Promise<ApiResponse<Empty>> => {
  const { accessToken } = useAuthStore.getState()
  if (!accessToken) throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.')

  const res = await axios.post<ApiResponse<Empty>>(
    `${BASE_URL}/api/albums`,
    data,
    {
      headers: {
        Authorization: withBearer(accessToken),
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return res.data
}

// 앨범 조회
export const getAlbum = async (): Promise<Album | null> => {
  const { accessToken } = useAuthStore.getState()
  if (!accessToken) throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.')

  const res = await axios.get<ApiResponse<Album>>(`${BASE_URL}/api/albums`, {
    headers: { Authorization: withBearer(accessToken) },
    withCredentials: true,
    validateStatus: (s) => s >= 200 && s < 300, 
  })

  if (res.status === 204) return null
  const data = res.data
  if (!data || typeof data !== 'object' || !('result' in (data as any))) return null

  const result = (data as ApiResponse<Album>).result
  return result ?? null
}

// 앨범 수정
export const updateAlbum = async (
  data: CreateAlbumRequest
): Promise<ApiResponse<Empty>> => {
  const { accessToken } = useAuthStore.getState()
  if (!accessToken) throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.')

  const res = await axios.patch<ApiResponse<Empty>>(
    `${BASE_URL}/api/albums`,
    data,
    {
      headers: {
        Authorization: withBearer(accessToken),
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  )
  return res.data
}

// 앨범 삭제
export const deleteAlbum = async (): Promise<ApiResponse<Empty>> => {
  const { accessToken } = useAuthStore.getState()
  if (!accessToken) throw new Error('세션이 만료되었습니다. 다시 로그인 해주세요.')

  const res = await axios.delete<ApiResponse<Empty>>(
    `${BASE_URL}/api/albums`,
    {
      headers: { Authorization: withBearer(accessToken) },
      withCredentials: true,
    }
  )
  return res.data
}
