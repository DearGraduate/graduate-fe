import styled from "styled-components";
import setIcon from "../../assets/icons/Set.png";
import CustomButton from "../../components/common/button";
import AlbumSection from "../../components/home/AlbumSection";
import EmptyAlbumMessage from "../../components/home/EmptyAlbumMessage";
import DownloadPDF from "../../components/modals/DownloadPDF";
import { useState } from "react";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useKakaoLogout } from "../../hooks/useKakaoLogout";

const HomeUserContainer = styled.div`
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

const TopContainer = styled.div`
  width: 100%;
  max-width: 393px;
  min-height: 200px;
  padding: 40px 0 20px 0;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0; /* 고정 크기 유지 */
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
  box-sizing: border-box;
`;

const DayBox = styled.div`
  min-width: 52px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-width: 1px;
  border: 1px solid #FFFFFF;
  padding: 3px 8px;
  background: transparent;
  opacity: 1;
`;

const DayText = styled.span`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
  white-space: nowrap;
`;

const SettingIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  max-width: 237px;
  min-height: 80px;
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
  width: 100%;
  max-width: 103px;
  min-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const DetailText = styled.div`
  width: 100%;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const AlbumContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 0; /* 스크롤을 위해 필요 */
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 290px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-bottom: 40px;
  flex-shrink: 0; /* 고정 크기 유지 */
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
  const albumExists = true;
  const isRollingPaperExpired = false;
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleOpenDownloadModal = () => setDownloadModalOpen(true);
  const handleCloseDownloadModal = () => setDownloadModalOpen(false);

  // ▼ 인쇄 대상
  const printRef = useRef<HTMLDivElement>(null);

  // 모달에서 넘겨주는 파일명 사용하고 싶다면 state로 보관해도 OK
  const fileName = "Photo:ry졸업앨범.pdf";

  // react-to-print 핸들러
  const handlePrint = useReactToPrint({
    contentRef: printRef,                 // 인쇄할 루트
    documentTitle: fileName.replace(/\.pdf$/i, ""), // 다이얼로그 파일명(확장자 제외)
    onAfterPrint: handleCloseDownloadModal,
    pageStyle: `
      /* A4 세로 + 여백 */
      @page { size: A4 portrait; margin: 12mm; }

      /* 배경색/이미지 강제 인쇄 */
      html, body, #print-root {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* 인쇄 영역 폭을 A4 내부에 예쁘게 맞추고 가운데 정렬 */
      #print-root {
        width: 186mm;            /* 210 - (12*2) 여백 기준 */
        margin: 0 auto;
      }

      /* 스크롤 박스 풀어서 전체 내용 출력 */
      [data-print-expand="true"] {
        overflow: visible !important;
        max-height: none !important;
        height: auto !important;
      }

      /* 카드/행이 페이지 중간에 잘리지 않게 */
      [data-print-keep="true"] {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }

      /* 인쇄 시 숨길 요소 */
      [data-print-hide="true"] { display: none !important; }

      /* 고정/절대/플렉스가 잘림을 유발하는 경우가 많아 완화 */
      @media print {
        * { box-shadow: none !important; }
      }
    `,
  });

  const { handleLogout } = useKakaoLogout();

  const handleSettingClick = () => {
    // 설정 아이콘 클릭 시 로그아웃
    if (window.confirm('로그아웃하시겠습니까?')) {
      handleLogout();
    }
  };


  return (
    <HomeUserContainer   id="print-root" ref={printRef}>
      <TopContainer>
        <IconContainer>
          <DayBox>
            <DayText>D-23</DayText>
          </DayBox>
          <SettingIcon 
            src={setIcon} 
            alt="설정" 
            onClick={handleSettingClick}
            title="로그아웃"
          />
        </IconContainer>
        <TitleContainer>
          <TitleText>박성민 의<br/>졸업 축하 앨범</TitleText>
          <DetailTextContainer>
            <DetailText>드디어...졸업한다..!</DetailText>
          </DetailTextContainer>
        </TitleContainer>
      </TopContainer>

      <AlbumContainer>
        {albumExists ? (
          <AlbumSection />
        ) : (
          <EmptyAlbumMessage />
        )}
      </AlbumContainer>
      
      <ButtonContainer>
        {!isRollingPaperExpired ? (
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
            >
              <ButtonText>나에게 축하글 작성하기</ButtonText>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
            >
              <ButtonText>나의 졸업 앨범 공유하기</ButtonText>
            </CustomButton>
          </>
        ) : (
          <div data-print-hide="true">
            <CustomButton data-print-hide="true"
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleOpenDownloadModal}
            >
              <ButtonText >나의 졸업 앨범 다운로드</ButtonText>
            </CustomButton>
            <DownloadPDF data-print-hide="true"
              onDownload={handlePrint}
              isOpen={isDownloadModalOpen}
              onRequestClose={handleCloseDownloadModal}
              fileName={fileName}
            />
          </div>
        )}
      </ButtonContainer>
    </HomeUserContainer>
  )
}

export default HomeUser