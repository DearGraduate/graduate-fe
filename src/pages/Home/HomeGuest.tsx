import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterImg from '../../assets/images/Character.png';  
import CustomButton from '../../components/common/button';
import LoginModal from '../../components/modals/LoginModal';

const HomeGuestContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-main);
  position: relative;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 237px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 1;
  margin-top: 110px;

  @media (max-width: 768px) {
    margin-top: 90px;
  }

  @media (max-width: 480px) {
    margin-top: 70px;
  }
`;

const TitleText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 150%;
  letter-spacing: 0;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 247px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  margin-top: 130px;

  @media (max-width: 768px) {
    margin-top: 100px;
    height: 200px;
  }

  @media (max-width: 480px) {
    margin-top: 80px;
    height: 180px;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 127px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 10px;
  line-height: 100%;
  letter-spacing: 0;
  color: var(--color-text-white);
  opacity: 1;
  text-align: center;
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 80px;
  }

  @media (max-width: 480px) {
    margin-top: 60px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 290px;
  min-height: 95px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-top: 20px;

  @media (max-width: 768px) {
    max-width: 280px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
  }
`;

const ButtonText = styled.span`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
`;

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
    <HomeGuestContainer>
      <TitleContainer>
        <TitleText>졸축위 의<br/>졸업 축하 앨범</TitleText>
      </TitleContainer>
      <ImageContainer>
        <StyledImg src={CharacterImg} alt="졸축위 캐릭터" />
      </ImageContainer>
      <TextContainer>
        150개의 앨범이 제작되었어요<br />2654개의 편지가 작성 되었어요
      </TextContainer>
      <ButtonContainer>
        <CustomButton
          bgColor="bg-button-default"
          className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
          onClick={handleButtonClick}
        >
          <ButtonText>나의 졸업 앨범 만들기</ButtonText>
        </CustomButton>
        <CustomButton
          bgColor="bg-button-default"
          className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
          onClick={handleButtonClick}
        >
          <ButtonText>나의 졸업 앨범 보기</ButtonText>
        </CustomButton>
      </ButtonContainer>
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginModalClose}
        onLoginClick={handleLoginClick}
      />
    </HomeGuestContainer>
  );
};

export default HomeGuest;
