import React, { useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';  
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';
import { useAlbumStore } from '../../store/albumStore';
import { albumService } from '../../services/albumService';
import { useShallow } from 'zustand/react/shallow'
import AlbumInfo from '../../components/common/AlbumInfo';

interface HomeGuestProps {
  albumId?: number;
}

const HomeGuest = ({ albumId }: HomeGuestProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

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

  // URL에 albumId가 있는 경우 축하글 작성 버튼 표시
  const handleWriteCongratulatoryMessage = () => {
    if (albumId) {
      navigate(`/writing?albumId=${albumId}`);
    } else {
      handleButtonClick(); // 로그인 모달 표시
    }
  };

  const handleViewMyAlbum = () => {
    handleButtonClick(); // 로그인 모달 표시
  };

    const { albumName, albumType } = useAlbumStore(
      useShallow((s) => ({
        albumName: s.albumName,
        albumType: s.albumType,
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
      </div>
      
      <div className="w-full max-w-[377.86px] max-h-[400px] flex items-center justify-center -mt-[6vh] -rotate-[18deg] relative z-0 short:hidden">
        <img 
          src={CharacterImg} 
          alt="졸축위 캐릭터" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="w-full max-w-[127px] min-h-[24px] flex items-center justify-center font-pretendard text-[10px] leading-[100%] tracking-[0] text-[var(--color-text-white)] opacity-100 text-center mt-[6vh]">
        <AlbumInfo />
      </div>
      
      <div className="w-full max-w-[290px] min-h-[95px] flex flex-col gap-[15px] opacity-100 mt-[4vh]">
        {albumId ? (
          // URL에 albumId가 있는 경우 (공개 앨범 조회)
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleWriteCongratulatoryMessage}
            >
              <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
                축하글 작성하기
              </span>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleViewMyAlbum}
            >
              <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
                내 앨범 보기/앨범 만들기
              </span>
            </CustomButton>
          </>
        ) : (
          // URL에 albumId가 없는 경우 (랜딩 페이지)
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleButtonClick}
            >
              <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
                나의 졸업 앨범 만들기
              </span>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleButtonClick}
            >
              <span className="font-ydestreet font-light text-xs leading-[100%] tracking-[0] text-center">
                나의 졸업 앨범 보기
              </span>
            </CustomButton>
          </>
        )}
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