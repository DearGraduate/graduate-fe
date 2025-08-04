import styled from 'styled-components';
import KAKAOMINI from '../../assets/icons/KAKAOMini.png';
import LoginLogo from '../../assets/images/LoginLogo.png';
import { useKakaoLogin } from '../../hooks/useKakaoLogin';

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
`;

const LogoContainer = styled.div`
  width: 100%;
  max-width: 189px;
  max-height: 197px;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15vh;

  
  @media (max-height: 600px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  max-width: 227px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 2vh;
`;

const ServiceDescriptionText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: var(--color-text-white);
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
  margin-top: 20vh;
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
  margin-top: 4vh;
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
`;

const KakaoImgContainer = styled.div`
  width: 30px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const KakaoTextContainer = styled.div`
  width: 100%;
  max-width: 126px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const KakaoText = styled.span`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-black);
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
`;

const Login = () => {
    const { handleKakaoLogin } = useKakaoLogin();

    return (
        <LoginContainer>
            <LogoContainer>
                <img src={LoginLogo} alt="로그인 로고" style={{ width: '100%', height: '100%' }} />
            </LogoContainer>
            <TextContainer>
                <ServiceDescriptionText>나만을 위한 친구의 편지를 간직할 수 있는</ServiceDescriptionText>
                <ServiceDescriptionText>편지 앨범 서비스, 포토:리</ServiceDescriptionText>
            </TextContainer>
            <StatsTextContainer>
                150개의 앨범이 제작 되었어요<br />2654개의 편지가 작성 되었어요
            </StatsTextContainer>
            <KakaoButtonContainer onClick={handleKakaoLogin}>
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