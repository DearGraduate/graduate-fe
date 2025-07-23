import styled from "styled-components";
import SetIcon from "../../assets/icons/Set.png";
import CustomButton from "../../components/common/button";
import AlbumSection from "../../components/home/AlbumSection";
import EmptyAlbumMessage from "../../components/home/EmptyAlbumMessage";
import DownloadPDF from "../../components/modals/DownloadPDF";
import { useState } from "react";

const HomeUserContainer = styled.div`
  width: 393px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--color-main);
  position: relative;
`;

const TopContainer = styled.div`
  width: 393px;
  height: 230px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
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
`;

const DayBox = styled.div`
  width: 52px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-width: 1px;
  border: 1px solid #FFFFFF;
  padding: 3px;
  background: transparent;
  opacity: 1;
`;

const DayText = styled.span`
  width: 40px;
  height: 17px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 13px;
  line-height: 150%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const SettingIcon = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const TitleContainer = styled.div`
  width: 237px;
  height: 104px;
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
  width: 103px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
`;

const DetailText = styled.div`
  width: 103px;
  height: 16px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #fff;
`;

const ButtonContainer = styled.div`
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 1;
  margin-top: auto;
  margin-bottom: 40px;
`;

const Spacer = styled.div`
  min-height: 20px;
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
  const albumExists = false;
  const isRollingPaperExpired = true;
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
              className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
            >
              <ButtonText>나에게 축하글 작성하기</ButtonText>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
            >
              <ButtonText>나의 졸업 앨범 공유하기</ButtonText>
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-[290px] h-[40px] rounded-[25px] px-[15px]"
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