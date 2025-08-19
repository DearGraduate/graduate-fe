import React, { useEffect, useMemo, useRef, useState } from 'react'
import MessageCard from '../common/MessageCard'
import testImage from '../../assets/icons/img_default.png'
import { getAlbumLetters, type AlbumLetterDTO } from '../../api/albumLetters'
import { useAlbumStore } from '../../store/albumStore'
import { useAuthStore } from '../../store/authStore'

const LIMIT = 10

export default function AlbumSection() {
  const albumId = useAlbumStore(s => s.albumId)
  const token   = useAuthStore(s => s.accessToken)

  const [letters, setLetters] = useState<AlbumLetterDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [hasMore, setHasMore] = useState(true)

  const abortRef = useRef<AbortController | null>(null)

  const makeCursor = (list: AlbumLetterDTO[]) => {
    if (list.length === 0) return {}
    const last = list[list.length - 1]
    const ts = last.updatedAt ?? last.createdAt
    return ts ? { lastUpdatedAt: ts, lastLetterId: last.id } : { lastLetterId: last.id }
  }

  const load = async (append = false) => {
    if (!albumId) return
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac

    setLoading(true)
    setError(null)
    try {
      const cursor = append ? makeCursor(letters) : {}
      const data = await getAlbumLetters(albumId, token ?? undefined, { limit: LIMIT, ...cursor })
      setLetters(prev => (append ? [...prev, ...data] : data))
      setHasMore(data.length === LIMIT)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!albumId) return
    load(false)
    return () => abortRef.current?.abort()
  }, [albumId])

  const messages = useMemo(
    () =>
      letters.map(l => ({
        key: l.id,
        name: l.writer_name ?? '익명',
        imageUrl: l.pic_url ?? (testImage as unknown as string),
        message: l.message,
      })),
    [letters]
  )

  if (!albumId) return <div className="text-white text-sm font-pretendard font-light text-center">앨범을 생성해주세요</div>
  if (loading && letters.length === 0) return <div className="text-white text-sm font-pretendard font-light text-center">축하글 불러오는 중…</div>
  if (error && letters.length === 0) return <div className="text-white text-sm font-pretendard font-light text-center">축하글을 불러오지 못했어요.</div>
  if (messages.length === 0) return <div className="text-white text-sm font-pretendard font-light text-center">아직 졸업 축하 편지가 없어요<br/>첫 졸업 축하 편지를 작성해 주세요😉</div>


  return (
    <div className="w-full max-w-[297px] max-h-[40vh] overflow-y-auto pr-[5px] pb-2 hide-scrollbar">
      <div className="grid grid-cols-2 gap-x-[37px] gap-y-2.5">
        {messages.map(m => (
          <div key={m.key} className="w-[130px]">
            <MessageCard name={m.name} imageUrl={m.imageUrl} message={m.message} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-3 flex justify-center">
          <button
            className="text-white text-xs underline"
            disabled={loading}
            onClick={() => load(true)}
          >
            {loading ? '불러오는 중…' : '더 보기'}
          </button>
        </div>
      )}
    </div>
  )
}
