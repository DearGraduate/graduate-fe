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

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
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

  @media (max-width: 768px) {
    padding: 30px 0 15px 0;
  }

  @media (max-width: 480px) {
    padding: 25px 0 10px 0;
  }
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

  @media (max-width: 768px) {
    padding: 0 30px;
    margin-top: 30px;
  }

  @media (max-width: 480px) {
    padding: 0 25px;
    margin-top: 25px;
  }
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

  @media (max-width: 768px) {
    min-width: 48px;
    height: 22px;
  }

  @media (max-width: 480px) {
    min-width: 45px;
    height: 20px;
    padding: 2px 6px;
  }
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

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const SettingIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
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

  @media (max-width: 768px) {
    margin-top: 25px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
    max-width: 200px;
  }
`;

const TitleText = styled.div`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 150%;
  letter-spacing: 0;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const DetailTextContainer = styled.div`
  width: 100%;
  max-width: 103px;
  min-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;

  @media (max-width: 768px) {
    max-width: 95px;
  }

  @media (max-width: 480px) {
    max-width: 90px;
  }
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

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 290px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-top: auto;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    max-width: 280px;
    gap: 12px;
    margin-bottom: 35px;
  }

  @media (max-width: 480px) {
    max-width: 260px;
    gap: 10px;
    margin-bottom: 30px;
  }
`;

const Spacer = styled.div`
  min-height: 20px;

  @media (max-width: 768px) {
    min-height: 15px;
  }

  @media (max-width: 480px) {
    min-height: 10px;
  }
`;

const ButtonText = styled.span`
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
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

      {albumExists ? (
        <>
          <AlbumSection />
          <Spacer />
        </>
      ) : (
        <>
          <EmptyAlbumMessage />
          <Spacer />
        </>
      )}
      
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