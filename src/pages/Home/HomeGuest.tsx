import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';
import { useAuthStore } from '../../store/authStore';
import { getAlbum } from '../../api/album'; 
import AlbumInfo from '../../components/common/AlbumInfo';

const HomeGuest = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 초기값은 비워두고, 화면에 뿌릴 때만 기본값 처리(아래 render에서 || 로 처리)
  const [albumName, setAlbumName] = useState('');
  const [albumType, setAlbumType] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  // ✅ zustand는 selector로 필요한 값만 구독하는 게 안전합니다
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const accessToken = useAuthStore((s) => s.accessToken);

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
      // 내 앨범으로 이동: getAlbum()이 Album | null을 주므로 그대로 사용
      const mine = await getAlbum();
      if (mine?.id) {
        navigate(`/home/${mine.id}`);
      } else {
        navigate('/making');
      }
    } catch (error) {
      console.error('내 앨범 조회 실패:', error);
      navigate('/making');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인되어 있고 accessToken이 준비되면 내 앨범 메타를 바로 state에
  useEffect(() => {
    if (!isLoggedIn || !accessToken) return;

    let alive = true;
    (async () => {
      try {
        const a = await getAlbum(); // Album | null
        if (!alive || !a) return;

        setAlbumName(a.albumName ?? '');
        setAlbumType(a.albumType ?? '');
        setDescription(a.description ?? '');
      } catch (e) {
        console.error('내 앨범 메타 조회 실패:', e);
      }
    })();

    return () => {
      alive = false;
    };
  }, [isLoggedIn, accessToken]);

  return (
    <div className="w-full min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
      {/* 타이틀 */}
      <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-2.5 opacity-100 mt-[5vh] relative z-10">
        <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
          {(albumName?.trim() || '포토리')}의<br />{(albumType?.trim() || '나의 앨범')}
        </div>
        <div className="w-full max-w-[103px] min-h-[16px] flex items-center justify-center opacity-100">
          <div className="w-full font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center text-white">
            {description?.trim() || ''}
          </div>
        </div>
      </div>

      {/* 캐릭터 이미지 */}
      <div className="w-full max-w-[377.86px] max-h-[400px] flex items-center justify-center -rotate-[18deg] relative z-0 short:hidden">
        <img
          src={CharacterImg}
          alt="졸축위 캐릭터"
          className="w-full h-full object-contain overflow-x-hidden"
        />
      </div>

      {/* 앨범 정보 */}
      <div className="w-full max-w-[127px] min-h-[24px] flex items-center justify-center font-pretendard text-[10px] leading-[100%] tracking-[0] text-[var(--color-text-white)] opacity-100 text-center mt-[90px]">
        <AlbumInfo />
      </div>

      {/* 액션 버튼 */}
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

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginModalClose}
        onLoginClick={handleLoginClick}
      />
    </div>
  );
};

export default HomeGuest;
