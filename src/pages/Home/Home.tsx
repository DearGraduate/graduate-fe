import HomeGuest from "./HomeGuest";
import HomeUser from "./HomeUser";
import { useAuthStore } from "../../store/authStore";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AlbumIDCheck } from "../../api/albumId";
import { useAlbumStore } from "../../store/albumStore";

const Home = () => {
  const { isLoggedIn } = useAuthStore();
  const { albumId } = useParams<{ albumId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [isMyAlbum, setIsMyAlbum] = useState(false);
  const { albumId: userAlbumId, setFromAlbum } = useAlbumStore();

  // URL에 albumId가 있는 경우 앨범 정보 조회
  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!albumId) return;
      
      setIsLoading(true);
      try {
        const albumData = await AlbumIDCheck(parseInt(albumId));
        
        // 앨범 정보를 스토어에 저장
        setFromAlbum({
          id: albumData.result.id,
          albumName: albumData.result.albumName,
          albumType: albumData.result.albumType
        });

        // 로그인한 사용자의 앨범인지 확인 (앨범 소유권 체크)
        if (isLoggedIn && userAlbumId) {
          setIsMyAlbum(userAlbumId === albumData.result.id);
        }
      } catch (error) {
        console.error('앨범 조회 실패:', error);
        // 에러 처리 - 404 페이지로 리다이렉트 또는 에러 메시지 표시
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlbumData();
  }, [albumId, isLoggedIn, userAlbumId, setFromAlbum]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--color-main)]">
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  if (albumId) {
    // URL에 albumId가 있는 경우: 로그인 여부와 관계없이 HomeUser 컴포넌트 사용
    return (
      <HomeUser 
        albumId={parseInt(albumId)} 
        isMyAlbum={isMyAlbum}
      />
    );
  } else {
    // URL에 albumId가 없는 경우: 로그인 여부와 관계없이 HomeGuest 컴포넌트 사용 (기본 랜딩 페이지)
    return <HomeGuest />;
  }
};

export default Home;
