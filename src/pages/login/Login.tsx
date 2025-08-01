import styled from 'styled-components';
import kakaoImg from '../../assets/kakao.png';

const LoginContainer = styled.div`
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

const LogoContainer = styled.div`
  width: 158px;
  height: 131px;
  background: #D9D9D9;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 150px;
`;

const TextContainer = styled.div`
  width: 252px;
  height: 79px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  opacity: 1;
  margin-top: 15px;
`;

const MainTextContainer = styled.div`
  width: 252px;
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: 1;
`;

const MainText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #fff;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
`;

const SubTextContainer = styled.div`
  width: 180px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const SubText = styled.div`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
`;

const StatsTextContainer = styled.div`
  width: 127px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-size: 10px;
  color: #fff;
  opacity: 1;
  text-align: center;
  margin-top: 250px;
`;

const KakaoButtonContainer = styled.button`
  width: 290px;
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
`;

const KakaoInnerContainer = styled.div`
  width: 177px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 21px;
  opacity: 1;
`;

const KakaoImgContainer = styled.div`
  width: 24px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const KakaoTextContainer = styled.div`
  width: 126px;
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
                        <img src={kakaoImg} alt="카카오톡" style={{ width: '26px', height: '26px' }} />
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