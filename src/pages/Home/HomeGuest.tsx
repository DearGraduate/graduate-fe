import styled from 'styled-components';
import characterImg from '../../assets/character.png';
import CustomButton from '../../components/common/button';

const HomeGuestContainer = styled.div`
  width: 393px;
  height: 852px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--color-main);
  position: relative;
`;

const TitleContainer = styled.div`
  width: 237px;
  height: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 1;
  margin-top: 110px;
`;

const TitleText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 150%;
  letter-spacing: 0;
  color: #fff;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 247px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  margin-top: 130px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  width: 127px;
  height: 24px;
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
`;

const ButtonContainer = styled.div`
  width: 290px;
  height: 95px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-top: 20px;
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
  return (
    <HomeGuestContainer>
      <TitleContainer>
        <TitleText>졸축위 의<br/>졸업 축하 앨범</TitleText>
      </TitleContainer>
      <ImageContainer>
        <StyledImg src={characterImg} alt="졸축위 캐릭터" />
      </ImageContainer>
      <TextContainer>
        150개의 앨범이 제작되었어요<br />2654개의 편지가 작성 되었어요
      </TextContainer>
      <ButtonContainer>
        <CustomButton
          bgColor="bg-button-default"
          className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
        >
          <ButtonText>나의 졸업 앨범 만들기</ButtonText>
        </CustomButton>
        <CustomButton
          bgColor="bg-button-default"
          className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
        >
          <ButtonText>나의 졸업 앨범 보기</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </HomeGuestContainer>
  );
};

export default HomeGuest;
