import styled from "styled-components";
import SetIcon from "../../assets/icons/Set.png";
import CustomButton from "../../components/common/button";
import AlbumSection from "../../components/home/AlbumSection";
import EmptyAlbumMessage from "../../components/home/EmptyAlbumMessage";
import DownloadPDF from "../../components/modals/DownloadPDF";
import { useState } from "react";

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

  return (
    <HomeUserContainer>
      <TopContainer>
        <IconContainer>
          <DayBox>
            <DayText>D-23</DayText>
          </DayBox>
          <SettingIcon src={SetIcon} alt="설정" />
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
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleOpenDownloadModal}
            >
              <ButtonText>나의 졸업 앨범 다운로드</ButtonText>
            </CustomButton>
            <DownloadPDF
              isOpen={isDownloadModalOpen}
              onRequestClose={handleCloseDownloadModal}
              fileName="홍길동_졸업앨범_2025_02_17.pdf"
            />
          </>
        )}
      </ButtonContainer>
    </HomeUserContainer>
  )
}

export default HomeUser