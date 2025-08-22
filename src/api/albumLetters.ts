import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const BASE = (process.env.REACT_APP_BASE_URL ?? '').replace(/\/+$/, '')
const withBearer = (t: string) => (t.startsWith('Bearer ') ? t : `Bearer ${t}`)

export interface AlbumLetterDTO {
  letterId: number
  writerName: string | null
  picUrl: string | null
  message: string
  createdAt?: string
  updatedAt?: string
  isPublic: boolean
}

export interface GetAlbumLettersQuery {
  limit: number          
  lastUpdatedAt?: string        
  lastLetterId?: number
}

export async function getAlbumLetters(
  albumId: number | string,
  query: GetAlbumLettersQuery
): Promise<AlbumLetterDTO[]> {
  // 로그인 여부
  const { isLoggedIn, accessToken } = useAuthStore.getState()

  // 로그인 여부에 따라 API 분기
  const url = isLoggedIn
    ? `${BASE}/api/albums/${albumId}/letters`
    : `${BASE}/api/home/albums/${albumId}/letters`

  const res = await axios.get<any>(url, {
    headers: isLoggedIn && accessToken 
      ? { Authorization: withBearer(accessToken) }
      : undefined,
    withCredentials: true,
    params: {
      limit: String(query.limit),
      ...(query.lastUpdatedAt ? { lastUpdatedAt: query.lastUpdatedAt } : {}),
      ...(query.lastLetterId ? { lastLetterId: query.lastLetterId } : {}),
    },
    validateStatus: () => true,
  })

  const { status, data } = res
  if (status === 204) return []

  if (status >= 200 && status < 300) {
    const result = data?.result ?? data
    if (Array.isArray(result)) return result
    if (Array.isArray(result?.letters)) return result.letters
    if (Array.isArray(result?.items)) return result.items
    if (Array.isArray(result?.content)) return result.content
    return []
  }

  if (status === 400 || status === 404) return []

  throw new Error(`letters fetch failed: ${status}`)
}
