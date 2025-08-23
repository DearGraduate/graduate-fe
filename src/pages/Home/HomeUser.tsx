import SetIcon from "../../assets/icons/Set.png";
import CustomButton from "../../components/common/button";
import AlbumSection from "../../components/home/AlbumSection";
import EmptyAlbumMessage from "../../components/home/EmptyAlbumMessage";
import DownloadPDF from "../../components/modals/DownloadPDF";
import DownloadModal from "../../components/modals/DownloadModal";
import LoginModal from "../../components/modals/LoginModal";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useAlbumStore } from '../../store/albumStore';
import { useAuthStore } from '../../store/authStore';
import { albumService } from '../../services/albumService';
import { useShallow } from 'zustand/react/shallow'
import { AlbumIDCheck } from "../../api/albumId";

interface HomeUserProps {
  albumId?: number;
  isMyAlbum?: boolean;
}

const HomeUser = ({ albumId, isMyAlbum }: HomeUserProps) => {
  const albumExists = true;
  const isRollingPaperExpired = false; 
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isDownloadCharacterModalOpen, setDownloadCharacterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const handleOpenDownloadModal = () => setDownloadModalOpen(true);
  const handleCloseDownloadModal = () => setDownloadModalOpen(false);
  const handleCloseDownloadCharacterModal = () => setDownloadCharacterModalOpen(false);

  const [albumName, setAlbumName] = useState<string>('이름');
  const [albumType, setAlbumType] = useState<string>('앨범 타입');
  const [description, setDescription] = useState<string>('');


  // isRollingPaperExpired가 true일 때 자동으로 다운로드 캐릭터 모달 열기
  useEffect(() => {
    if (isRollingPaperExpired) {
      setDownloadCharacterModalOpen(true);
    }
  }, [isRollingPaperExpired]);
  
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

  const handleSettingClick = () => {
    // 설정 아이콘 클릭 시 설정 페이지로 이동
    navigate('/setting');
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(false);
    navigate('/login');
  };

  // 축하글 작성 핸들러 - 앨범 ID가 있으면 해당 앨범에 작성
  const handleWriteCongratulatoryMessage = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (albumId) {
      navigate(`/writing?albumId=${albumId}`);
    } else {
      navigate('/writing');
    }
  };

  // 내 앨범 보기/앨범 만들기 핸들러
  const handleViewMyAlbum = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    
    if (isMyAlbum) {
      // 내 앨범인 경우 공유 페이지로 이동
      navigate('/sharing');
    } else {
      // 남의 앨범인 경우 내 앨범으로 이동
      navigate('/');
    }
  };

    useEffect(() => {
    if (!albumId) return;
    let cancelled = false;

    (async () => {
      try {
        const data = await AlbumIDCheck(albumId);
        // 래핑된 응답({result: {...}})과 바로 본문 형태 둘 다 대응
        const r: any = (data as any)?.result ?? data;

        if (!cancelled) {
          setAlbumName(r?.albumName ?? '이름');
          setAlbumType(r?.albumType ?? '앨범 타입');
          setDescription(r?.description ?? '');
        }
      } catch (e) {
        console.error('앨범 ID 데이터 조회 실패:', e);
      }
    })();

    return () => { cancelled = true };
  }, [albumId]);

  
  return (
    <div 
      id="print-root" 
      ref={printRef}
      className="w-full min-h-screen m-0 flex flex-col items-center bg-[var(--color-main)] relative px-5 box-border"
    >
      <div className="w-full max-w-[393px] min-h-[200px] py-10 pb-5 opacity-100 flex flex-col items-center justify-start relative flex-shrink-0">
        <div className="w-full flex flex-row items-start justify-end relative mt-10 px-[35px] box-border">
          {/* <div className="min-w-[52px] h-[23px] flex items-center justify-center gap-[3px] border border-white p-[3px] px-2 bg-transparent opacity-100">
            <span className="font-ydestreet font-bold text-[13px] leading-[150%] tracking-[0] text-center text-white whitespace-nowrap">
              D-23
            </span>
          </div> */}
          {isMyAlbum && (
            <img 
              src={SetIcon} 
              alt="설정" 
              className="w-[23px] h-[23px] cursor-pointer hover:opacity-70 transition-opacity duration-200" 
              onClick={handleSettingClick}
              title="설정"
            />
          )}
        </div>
        
        <div className="w-full max-w-[237px] min-h-[80px] flex flex-col items-center justify-center gap-[5px] opacity-100 mt-[30px]">
          <div className="font-ydestreet font-bold text-[36px] leading-[150%] tracking-[0] text-white text-center">
            {albumName ?? '이름'}의<br/>{albumType ?? '앨범 타입'}
          </div>
          <div className="w-full max-w-[103px] min-h-[16px] flex items-center justify-center opacity-100">
            <div className="w-full font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center text-white">
            {description || ""}
          </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start min-h-0 mb-4">
        {albumExists ? (
          <AlbumSection albumId={albumId} />
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
              onClick={handleWriteCongratulatoryMessage}
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                {isMyAlbum ? '나에게 축하글 작성하기' : '축하글 작성하기'}
              </span>
            </CustomButton>
            <CustomButton
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleViewMyAlbum}
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                {isMyAlbum ? '나의 앨범 공유하기' : '내 앨범 보기/앨범 만들기'}
              </span>
            </CustomButton>
          </>
        ) : (
          <div data-print-hide="true">
            <CustomButton data-print-hide="true"
              bgColor="bg-button-default"
              className="w-full h-10 rounded-[25px] px-4 font-ydestreet font-light text-xs"
              onClick={handleOpenDownloadModal}
            >
              <span className="font-ydestreet font-light text-[12px] leading-[100%] tracking-[0] text-center">
                나의 앨범 다운로드
              </span>
            </CustomButton>
            <DownloadPDF data-print-hide="true"
              onDownload={handlePrint}
              isOpen={isDownloadModalOpen}
              onRequestClose={handleCloseDownloadModal}
              fileName={fileName}
            />
          </div>
        )}
      </div>

      <DownloadModal 
        isOpen={isDownloadCharacterModalOpen}
        onRequestClose={handleCloseDownloadCharacterModal}
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onRequestClose={handleLoginModalClose}
        onLoginClick={handleLoginClick}
      />
    </div>
  )
}

export default HomeUser