import styled from 'styled-components';
import KAKAOMINI from '../../assets/icons/KAKAOMini.png';

const LoginContainer = styled.div`
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

const LogoContainer = styled.div`
  width: 100%;
  max-width: 158px;
  height: 131px;
  background: #D9D9D9;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 150px;

  @media (max-width: 768px) {
    max-width: 150px;
    height: 125px;
    margin-top: 130px;
  }

  @media (max-width: 480px) {
    max-width: 140px;
    height: 120px;
    margin-top: 120px;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 252px;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 1;
  margin-top: 15px;

  @media (max-width: 768px) {
    max-width: 240px;
    gap: 13px;
  }

  @media (max-width: 480px) {
    max-width: 230px;
    gap: 12px;
  }
`;

const MainTextContainer = styled.div`
  width: 100%;
  max-width: 252px;
  min-height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: 1;

  @media (max-width: 768px) {
    max-width: 240px;
  }

  @media (max-width: 480px) {
    max-width: 230px;
  }
`;

const MainText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #fff;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 34px;
  }

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const SubTextContainer = styled.div`
  width: 100%;
  max-width: 180px;
  min-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  @media (max-width: 768px) {
    max-width: 170px;
  }

  @media (max-width: 480px) {
    max-width: 160px;
  }
`;

const SubText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StatsTextContainer = styled.div`
  width: 100%;
  max-width: 127px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 10px;
  color: #fff;
  opacity: 1;
  text-align: center;
  margin-top: 250px;

  @media (max-width: 768px) {
    margin-top: 220px;
    max-width: 125px;
  }

  @media (max-width: 480px) {
    margin-top: 200px;
    max-width: 120px;
  }
`;

const KakaoButtonContainer = styled.button`
  width: 100%;
  max-width: 290px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 25px;
  background: #FAE100;
  border: none;
  cursor: pointer;
  opacity: 1;
  margin: 0 auto;
  margin-top: 30px;

  @media (max-width: 768px) {
    max-width: 280px;
    margin-top: 25px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
    height: 38px;
    margin-top: 20px;
  }
`;

const KakaoInnerContainer = styled.div`
  width: 100%;
  max-width: 177px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 21px;
  opacity: 1;

  @media (max-width: 768px) {
    max-width: 170px;
    gap: 19px;
  }

  @media (max-width: 480px) {
    max-width: 160px;
    gap: 18px;
  }
`;

const KakaoImgContainer = styled.div`
  width: 30px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  @media (max-width: 768px) {
    width: 28px;
    height: 13px;
  }

  @media (max-width: 480px) {
    width: 26px;
    height: 12px;
  }
`;

const KakaoTextContainer = styled.div`
  width: 100%;
  max-width: 126px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  @media (max-width: 768px) {
    max-width: 120px;
  }

  @media (max-width: 480px) {
    max-width: 110px;
  }
`;

const KakaoText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-black);
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Login = () => {
    return (
        <LoginContainer>
            <LogoContainer />
            <TextContainer>
                <MainTextContainer>
                    <MainText>졸업축하위원회</MainText>
                </MainTextContainer>
                <SubTextContainer>
                    <SubText>특별한 졸업식을 만들어 드립니다</SubText>
                </SubTextContainer>
            </TextContainer>
            <StatsTextContainer>
                150개의 앨범이 제작 되었어요<br />2654개의 편지가 작성 되었어요
            </StatsTextContainer>
            <KakaoButtonContainer>
                <KakaoInnerContainer>
                    <KakaoImgContainer>
                        <img src={KAKAOMINI} alt="카카오톡" style={{ width: '26px', height: '26px' }} />
                    </KakaoImgContainer>
                    <KakaoTextContainer>
                        <KakaoText>KAKAO로 로그인 하기</KakaoText>
                    </KakaoTextContainer>
                </KakaoInnerContainer>
            </KakaoButtonContainer>
        </LoginContainer>
    );
};

export default Login;