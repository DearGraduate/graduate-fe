import { Sheet, SheetRef } from "react-modal-sheet";
import { useEffect, useRef, useState } from "react";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";
export const SHEET_SNAP_POINTS = [0.7, 0.5, 0.3];
export const SHEET_INITIAL_SNAP = 2;
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { deleteLetter } from '../../api/deleteLetter';
import { useAuthStore } from '../../store/authStore';
import { useLetterStore } from '../../store/letterStore';

interface EditDeleteBottomSheetProps extends ModalProps {
  letterData?: {
    id: string;
    writerName: string;
    message: string;
    isPublic: boolean;
    picUrl?: string;
  };
}

const EditDeleteBottomSheet = ({ isOpen, onRequestClose, letterData }: EditDeleteBottomSheetProps) => {
  const isWindow = useMediaQuery({ query: "(min-width: 1025px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1024px), (max-height:1024px)" });
  const navigate = useNavigate();
  const ref = useRef<SheetRef>(null);
  const [, setSnapPoint] = useState<number>(SHEET_INITIAL_SNAP);
  const accessToken = useAuthStore(s => s.accessToken);
  const selectedLetterId = useLetterStore(s => s.selectedLetterId);
  const setSelectedLetterData = useLetterStore(s => s.setSelectedLetterData);
  const FRAME_WIDTH = 360;

  const [mode, setMode] = useState<"select" | "confirm">("select");
  useEffect(() => {
    if (!isOpen) setMode("select"); // 시트 닫히면 초기화
  }, [isOpen]);

  const mountEl = typeof window !== 'undefined'
    ? document.getElementById('app-frame')!
    : null;
  if (!mountEl) {
    console.error("Mount element not found. Ensure 'app-frame' exists in your HTML.");
    return null;
  }


  const handleDelete = async () => {
    console.log('Delete button clicked');
    console.log('letterId:', selectedLetterId);
    console.log('accessToken:', accessToken);
    if (!selectedLetterId || !accessToken) {
      console.log('Missing letterId or accessToken');
      return;
    }
    try {
      await deleteLetter(String(selectedLetterId), accessToken);
      alert('축하 메시지가 성공적으로 삭제되었습니다.');
      onRequestClose();
      window.location.reload();
    } catch (e) {
      console.log('Delete error:', e);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onRequestClose}
      mountPoint={mountEl}
      snapPoints={SHEET_SNAP_POINTS}
      initialSnap={SHEET_INITIAL_SNAP}
      ref={ref}
      onSnap={setSnapPoint}

    >
      {/* <Sheet.Backdrop onTap={onRequestClose} /> */}

      <Sheet.Backdrop onTap={onRequestClose} />

      {/* ✅ Container: 폭만 프레임에 맞추고 중앙 정렬. position/top/left 등은 절대 주지 말 것 */}
      <Sheet.Container className="bg-white rounded-t-[40px] w-full  mx-auto">
        <Sheet.Header />
        <Sheet.Content>
          {/* 내부에 fixed/left/transform 같은 좌표계 스타일 주지 말고, 그냥 일반 레이아웃 */}

          {mode === "select" ? (
            <div className="px-6 pb-8 pt-4">
              <h3
                style={{ fontFamily: 'Ydestreet', fontWeight: 700, fontSize: '14px' }}
                className="text-lg font-semibold mb-6 text-center text-black"
              >
                축하글을 수정하거나 삭제하시겠어요?
              </h3>

              <div className="flex justify-center gap-3">
                <CustomButton
                  onClick={() => {
                    if (letterData) setSelectedLetterData(letterData);
                    navigate('/editing');
                  }}
                  className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                >
                  축하글 수정하기
                </CustomButton>

                <CustomButton
                  onClick={() => setMode("confirm")}
                  className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                >
                  축하글 삭제하기
                </CustomButton>
              </div>
            </div>
          ) : (
            <div className="px-6 pb-8 pt-4">
              <h3
                style={{ fontFamily: 'Ydestreet', fontWeight: 700, fontSize: '14px' }}
                className="text-lg font-semibold mb-8 text-center text-black"
              >
                축하글을 정말 삭제할까요?
              </h3>

              <div className="flex justify-center items-center gap-6">
                {/* 취소: 선택 화면으로 돌아가기 */}
                <CustomButton
                  onClick={() => setMode("select")}
                  className="font-medium px-9 py-2 text-sm bg-white text-gray-800 rounded-full active:bg-gray-200"
                  bgColor="bg-white"
                >
                  취소
                </CustomButton>

                {/* 실제 삭제 */}
                <CustomButton
                  onClick={handleDelete}
                  className="px-5 py-[12px] rounded-full w-fit whitespace-nowrap text-center"
                >
                  삭제할게요
                </CustomButton>
              </div>
            </div>
          )}


        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}

export default EditDeleteBottomSheet;