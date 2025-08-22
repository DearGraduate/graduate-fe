import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';  
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';
import { useAuthStore } from '../../store/authStore';
import { albumService } from '../../services/albumService';
import AlbumInfo from '../../components/common/AlbumInfo';
import { AlbumIDCheck } from "../../api/albumId";

const HomeGuest = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);           // 내 앨범 보기 버튼 로딩
  const [albumName, setAlbumName] = useState('이름');          // 로컬 상태로 교체
  const [albumType, setAlbumType] = useState('앨범 타입');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  // URL 경로에서 앨범 ID 추출 (예: /home/:albumId)
  const { albumId: albumIdParam } = useParams<{ albumId?: string }>();
  const albumId = albumIdParam ? Number(albumIdParam) : undefined;

  const handleButtonClick = () => setIsLoginModalOpen(true);
  const handleLoginModalClose = () => setIsLoginModalOpen(false);
  const handleLoginClick = () => {
    setIsLoginModalOpen(false);
    navigate('/login');
  };

  const handleCreateAlbum = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    navigate('/making');
  };

  const handleViewMyAlbum = async () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setIsLoading(true);
    try {
      const album = await albumService.fetch();
      if (album) {
        navigate(`/home/${album.id}`);
      } else {
        navigate('/making');
      }
    } catch (error) {
      console.error('앨범 조회 실패:', error);
      navigate('/making');
    } finally {
      setIsLoading(false);
    }
  };

  // ★ 앨범 스토어 제거: 라우트의 albumId로 직접 API 호출
  useEffect(() => {
    if (!albumId) return; // URL에 앨범 ID가 없으면 스킵
    let cancelled = false;

    (async () => {
      try {
        const data = await AlbumIDCheck(albumId);
        // { result: {...} } 래핑과 바로 본문 모두 대응
        const r: any = (data as any)?.result ?? data;

        if (!cancelled) {
          setAlbumName(r?.albumName ?? '이름');
          setAlbumType(r?.albumType ?? '앨범 타입');
          setDescription(r?.description ?? '');
        }
      } catch (e) {
        console.error('앨범 ID 데이터 조회 실패:', e);
      }
    })();

    return () => { cancelled = true; };
  }, [albumId]);

  return (
    <div className="w-full min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
      <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-2.5 opacity-100 mt-[5vh] relative z-10">
        <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
          {albumName}의<br/>{albumType}
        </div>
        <div className="w-full max-w-[103px] min-h-[16px] flex items-center justify-center opacity-100">
          <div className="w-full font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center text-white">
            {description}
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-[377.86px] max-h-[400px] flex items-center justify-center -rotate-[18deg] relative z-0 short:hidden">
        <img 
          src={CharacterImg} 
          alt="졸축위 캐릭터" 
          className="w-full h-full object-contain overflow-x-hidden"
        />
      </div>
      
      <div className="w-full max-w-[127px] min-h-[24px] flex items-center justify-center font-pretendard text-[10px] leading-[100%] tracking-[0] text-[var(--color-text-white)] opacity-100 text-center mt-[90px]">
        <AlbumInfo />
      </div>
      
      <div className="w-full max-w-[290px] min-h-[95px] flex flex-col gap-[15px] opacity-100 mt-[2vh]">
        <CustomButton
          bgColor="bg-button-default"
          className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
          onClick={handleCreateAlbum}
        >
          <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
            나의 앨범 만들기
          </span>
        </CustomButton>
        <CustomButton
          bgColor="bg-button-default"
          className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
          onClick={handleViewMyAlbum}
          disabled={isLoading}
        >
          <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
            {isLoading ? '로딩 중...' : '나의 앨범 보기'}
          </span>
        </CustomButton>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginModalClose}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default HomeGuest;
