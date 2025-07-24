import styled from "styled-components";
import setIcon from "../../assets/set.png";
import CustomButton from "../../components/common/button";

const HomeUserContainer = styled.div`
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

const TopContainer = styled.div`
  width: 393px;
  height: 230px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  margin-top: 40px;
  padding: 0 35px;
`;

const DayBox = styled.div`
  width: 52px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-width: 1px;
  border: 1px solid #FFFFFF;
  padding: 3px;
  background: transparent;
  opacity: 1;
`;

const DayText = styled.span`
  width: 40px;
  height: 17px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const SettingIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  width: 237px;
  height: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: 1;
  margin-top: 30px;
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

const DetailTextContainer = styled.div`
  width: 103px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const DetailText = styled.div`
  width: 103px;
  height: 16px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const MiddleTextContainer = styled.div`
  width: 230px;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 400px;
`;

const MiddleText1 = styled.div`
  width: 159px;
  height: 17px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const MiddleText2 = styled.div`
  width: 230px;
  height: 17px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const ButtonContainer = styled.div`
  width: 290px;
  height: 95px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-top: 250px;
`;

const ButtonText = styled.span`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
`;

const HomeUser = () => {
  return (
    <HomeUserContainer>
      <TopContainer>
        <IconContainer>
          <DayBox>
            <DayText>D-23</DayText>
          </DayBox>
          <SettingIcon src={setIcon} alt="설정" />
        </IconContainer>
        <TitleContainer>
          <TitleText>박성민 의<br/>졸업 축하 앨범</TitleText>
          <DetailTextContainer>
            <DetailText>드디어...졸업한다..!</DetailText>
          </DetailTextContainer>
        </TitleContainer>
      </TopContainer>
      <MiddleTextContainer>
        <MiddleText1>아직 졸업 축하 편지가 없어요</MiddleText1>
        <MiddleText2>나의 졸업 앨범을 친구와 공유 해보세요😉</MiddleText2>
      </MiddleTextContainer>
      <ButtonContainer>
        <CustomButton
          bgColor="bg-button-default"
          className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
        >
          <ButtonText>나에게 축하글 작성하기</ButtonText>
        </CustomButton>
        <CustomButton
          bgColor="bg-button-default"
          className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
        >
          <ButtonText>나의 졸업 앨범 공유하기</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </HomeUserContainer>
  )
}

export default HomeUser