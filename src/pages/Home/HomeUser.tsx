import SetIcon from "../../assets/icons/Set.png";
import CustomButton from "../../components/common/button";
import AlbumSection from "../../components/home/AlbumSection";
import EmptyAlbumMessage from "../../components/home/EmptyAlbumMessage";
import DownloadPDF from "../../components/modals/DownloadPDF";
import DownloadModal from "../../components/modals/DownloadModal";
import { useState, useEffect } from "react";

const HomeUser = () => {
  const albumExists = true;
  const isRollingPaperExpired = true;
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isDownloadCharacterModalOpen, setDownloadCharacterModalOpen] = useState(false);

  const handleOpenDownloadModal = () => setDownloadModalOpen(true);
  const handleCloseDownloadModal = () => setDownloadModalOpen(false);
  const handleCloseDownloadCharacterModal = () => setDownloadCharacterModalOpen(false);

  // isRollingPaperExpired가 true일 때 자동으로 다운로드 캐릭터 모달 열기
  useEffect(() => {
    if (isRollingPaperExpired) {
      setDownloadCharacterModalOpen(true);
    }
  }, [isRollingPaperExpired]);

  return (
    <div className="w-screen min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border">
      <div className="w-full max-w-[393px] min-h-[200px] py-10 pb-5 opacity-100 flex flex-col items-center justify-start relative flex-shrink-0">
        <div className="w-full flex flex-row items-start justify-between relative mt-10 px-[35px] box-border">
          <div className="min-w-[52px] h-[23px] flex items-center justify-center gap-[3px] border border-white p-[3px] px-2 bg-transparent opacity-100">
            <span className="font-ydestreet font-bold text-[13px] leading-[150%] tracking-[0] text-center text-white whitespace-nowrap">
              D-23
            </span>
          </div>
          <img src={SetIcon} alt="설정" className="w-[23px] h-[23px] cursor-pointer" />
        </div>
        
        <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-[5px] opacity-100 mt-[30px]">
          <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
            박성민 의<br/>졸업 축하 앨범
          </div>
          <div className="w-full max-w-[103px] min-h-[16px] flex items-center justify-center opacity-100">
            <div className="w-full font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center text-white">
              드디어...졸업한다..!
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-0 mb-4">
        {albumExists ? (
          <AlbumSection />
        ) : (
          <EmptyAlbumMessage />
        )}
      </div>
      
      <div className="w-full max-w-[290px] flex flex-col gap-[15px] opacity-100 mb-10 flex-shrink-0">
        {!isRollingPaperExpired ? (
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                나에게 축하글 작성하기
              </span>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                나의 졸업 앨범 공유하기
              </span>
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleOpenDownloadModal}
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                나의 졸업 앨범 다운로드
              </span>
            </CustomButton>
            <DownloadPDF
              isOpen={isDownloadModalOpen}
              onRequestClose={handleCloseDownloadModal}
              fileName="홍길동_졸업앨범_2025_02_17.pdf"
            />
          </>
        )}
      </div>

      <DownloadModal 
        isOpen={isDownloadCharacterModalOpen}
        onRequestClose={handleCloseDownloadCharacterModal}
      />
    </div>
  )
}

export default HomeUser