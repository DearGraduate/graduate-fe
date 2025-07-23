import styled from "styled-components";
import LettersImage from "../../assets/images/Letters.png"; // 실제 경로에 맞춰 조정

const AlbumSectionWrapper = styled.div`
  width: 297px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  margin-top: 40px;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const AlbumRow = styled.div`
  width: 297px;
  height: 199px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 37px;
`;

const AlbumImage = styled.img`
  width: 130px;
  height: 199px;
  object-fit: cover;
  border-radius: 12px;
`;

const AlbumSection = () => {
  // 예시용 데이터 (앨범 6개면 3행)
  const dummyAlbums = [1, 2, 3, 4, 5, 6];

  // 두 개씩 묶기
  const albumPairs = [];
  for (let i = 0; i < dummyAlbums.length; i += 2) {
    albumPairs.push(dummyAlbums.slice(i, i + 2));
  }

  return (
    <AlbumSectionWrapper>
      {albumPairs.map((pair, index) => (
        <AlbumRow key={index}>
          {pair.map((_, i) => (
            <AlbumImage src={LettersImage} alt={`앨범 ${index * 2 + i + 1}`} key={i} />
          ))}
          {/* 앨범이 홀수개일 경우 오른쪽 자리 비우기 */}
          {pair.length === 1 && <div style={{ width: "130px" }} />}
        </AlbumRow>
      ))}
    </AlbumSectionWrapper>
  );
};

export default AlbumSection;
