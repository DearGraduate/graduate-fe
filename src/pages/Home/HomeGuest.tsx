import React, { useState, useEffect , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';  
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';
import { useAuthStore } from '../../store/authStore';
import { useAlbumStore } from '../../store/albumStore';
import { albumService } from '../../services/albumService';
import AlbumInfo from '../../components/common/AlbumInfo';
import { useShallow } from 'zustand/react/shallow'



const HomeGuest = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { setFromAlbum } = useAlbumStore();

  const handleButtonClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(false);
    navigate('/login');
  };

  const handleCreateAlbum = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    // 로그인된 경우 앨범 생성 페이지로 이동
    navigate('/making');
  };

  const handleViewMyAlbum = async () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    // 로그인된 경우 사용자의 앨범 정보를 가져와서 처리
    setIsLoading(true);
    try {
      const album = await albumService.fetch();
      if (album) {
        // 앨범이 있는 경우 해당 앨범 페이지로 이동
        navigate(`/home/${album.id}`);
      } else {
        // 앨범이 없는 경우 앨범 생성 페이지로 이동
        navigate('/making');
      }
    } catch (error) {
      console.error('앨범 조회 실패:', error);
      // 에러 발생 시 앨범 생성 페이지로 이동
      navigate('/making');
    } finally {
      setIsLoading(false);
    }
  };

  const { albumName, albumType , discription } = useAlbumStore(
          useShallow((s) => ({
            albumName: s.albumName,
            albumType: s.albumType,
            discription: s.description
          }))
        )
      
        const didFetch = useRef(false)
        useEffect(() => {
          if (didFetch.current) return
          didFetch.current = true
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          albumService.fetch().catch(() => {})
        }, [])
  

  

  return (
    <div className="w-full min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
      <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-2.5 opacity-100 mt-[5vh] relative z-10">
        <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
            {albumName ?? '이름'}의<br/>{albumType ?? '앨범 타입'}
          </div>
          <div className="w-full max-w-[103px] min-h-[16px] flex items-center justify-center opacity-100">
            <div className="w-full font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center text-white">
            {discription || ""}
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