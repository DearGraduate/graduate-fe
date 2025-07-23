import styled from "styled-components";

const MiddleTextContainer = styled.div`
  width: 230px;
  height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 170px;
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

const EmptyAlbumMessage = () => (
  <MiddleTextContainer>
    <MiddleText1>아직 졸업 축하 편지가 없어요</MiddleText1>
    <MiddleText2>나의 졸업 앨범을 친구와 공유 해보세요😉</MiddleText2>
  </MiddleTextContainer>
);

export default EmptyAlbumMessage;