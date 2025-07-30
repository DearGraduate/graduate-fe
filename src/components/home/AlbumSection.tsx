import styled from "styled-components";
import MessageCard, { defaultMessages } from "../common/MessageCard";

const AlbumSectionWrapper = styled.div`
  width: 100%;
  max-width: 297px;
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

  @media (max-width: 768px) {
    max-width: 290px;
    gap: 9px;
    margin-top: 35px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    gap: 8px;
    margin-top: 30px;
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

  @media (max-width: 768px) {
    max-width: 290px;
    gap: 35px;
    min-height: 175px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    gap: 30px;
    min-height: 170px;
  }
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
            <MessageCard
              key={i}
              name={message.name}
              imageUrl={message.imageUrl}
              message={message.message}
            />
          ))}
          {/* 메시지가 홀수개일 경우 오른쪽 자리 비우기 */}
          {pair.length === 1 && <div style={{ width: "200px" }} />}
        </AlbumRow>
      ))}
    </AlbumSectionWrapper>
  );
};

export default AlbumSection;
