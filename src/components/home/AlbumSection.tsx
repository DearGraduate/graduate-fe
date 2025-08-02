import styled from "styled-components";
import MessageCard, { defaultMessages } from "../common/MessageCard";

const AlbumSectionWrapper = styled.div`
  width: 100%;
  max-width: 297px;
  max-height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  padding-right: 5px; /* 스크롤바 공간 확보 */

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const AlbumRow = styled.div`
  width: 100%;
  max-width: 297px;
  min-height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 37px;
  flex-shrink: 0; /* 행이 압축되지 않도록 */
`;

const CardContainer = styled.div`
  width: 130px;
  flex-shrink: 0;
`;

const AlbumSection = () => {
  // MessageCard의 defaultMessages 사용
  const messages = defaultMessages;

  // 두 개씩 묶기
  const messagePairs = [];
  for (let i = 0; i < messages.length; i += 2) {
    messagePairs.push(messages.slice(i, i + 2));
  }

  return (
    <AlbumSectionWrapper>
      {messagePairs.map((pair, index) => (
        <AlbumRow key={index}>
          {pair.map((message, i) => (
            <CardContainer key={i}>
              <MessageCard
                name={message.name}
                imageUrl={message.imageUrl}
                message={message.message}
              />
            </CardContainer>
          ))}
        </AlbumRow>
      ))}
    </AlbumSectionWrapper>
  );
};

export default AlbumSection;
