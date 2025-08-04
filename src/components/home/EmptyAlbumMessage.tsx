import styled from "styled-components";
import Character_graduate from "../../assets/images/Character_graduate.png";

const ImageContainer = styled.div`
  width: 100%;
  max-width: 250px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-height: 700px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  width: 256px;
  height: 36px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
`;

const AlbumCompleteText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: var(--color-text-white);
`;

const EmptyAlbumMessage = () => (
    <>
        <ImageContainer>
            <img src={Character_graduate} alt="Character_graduate" />
        </ImageContainer>
        <TextContainer>
            <AlbumCompleteText>앨범이 완성 되었어요!</AlbumCompleteText>
            <AlbumCompleteText>친구들에게 공유해 축하글을 모아보세요!</AlbumCompleteText>
        </TextContainer>
    </>
);

export default EmptyAlbumMessage;