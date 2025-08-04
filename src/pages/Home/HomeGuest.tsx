import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';  
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';

const HomeGuest = () => {
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

  return (
    <div className="w-screen min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
      <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-2.5 opacity-100 mt-[5vh] relative z-10">
        <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
          졸축위 의<br/>졸업 축하 앨범
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
        150개의 앨범이 제작되었어요<br />2654개의 편지가 작성 되었어요
      </div>
      
      <div className="w-full max-w-[290px] min-h-[95px] flex flex-col gap-[15px] opacity-100 mt-[4vh]">
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
