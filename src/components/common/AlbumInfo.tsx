import { useEffect, useState } from "react";
import { countAlbums } from "../../api/projectInfo";
import type { CountAlbumsResponse } from "../../types/Projsct";


const AlbumInfo = () => {
    const [counts, setCounts] = useState<{ totalAlbumCount: number; totalLetterCount: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const data: CountAlbumsResponse = await countAlbums();
                if (alive && data.isSuccess) setCounts(data.result);
            } catch (e) {
                if (alive) setErr("불러오기에 실패했어요.");
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    if (loading) return <div>불러오는 중…</div>;
    if (err) return <div>{err}</div>;
    if (!counts) return null;

    return (
        <div 
        style={{ fontFamily: 'Pretendard', fontWeight: 300 }}
        className="text-[10px] space-y-[1px]">
            <div>{counts.totalAlbumCount}개의 앨범이 제작 되었어요</div>
            <div>{counts.totalLetterCount}개의 편지가 작성 되었어요</div>
        </div>
    );
};

export default AlbumInfo;
