import { Sheet, SheetRef } from "react-modal-sheet";
import { useRef, useState } from "react";
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
    letterId: string | number;
}

const EditDeleteBottomSheet = ({ isOpen, onRequestClose }: ModalProps) => {
    const isWindow = useMediaQuery({ query: "(min-width: 1025px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1024px), (max-height:1024px)" });
    const navigate = useNavigate();
    const ref = useRef<SheetRef>(null);
    const [, setSnapPoint] = useState<number>(SHEET_INITIAL_SNAP);
    const accessToken = useAuthStore(s => s.accessToken);
    const selectedLetterId = useLetterStore(s => s.selectedLetterId);

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
            ref={ref}
            onSnap={setSnapPoint}
            snapPoints={SHEET_SNAP_POINTS}
            initialSnap={SHEET_INITIAL_SNAP}

        >
            <Sheet.Backdrop onTap={onRequestClose} />
            <Sheet.Container
                className={`bg-white rounded-t-[40px]
    ${isWindow
                        ? 'max-w-[360px] mx-auto'
                        : isTablet
                            ? 'w-screen'
                            : isMobile
                                ? 'w-screen' : ''}`}
            >
                <Sheet.Header />
                <Sheet.Content>
                    <div className="flex flex-col justify-center items-center p-10 w-full text-center mb-5">
                        <h3
                            style={{ fontFamily: 'Ydestreet', fontWeight: '700', fontSize: '14px' }}
                            className="text-lg font-semibold mb-6 w-full whitespace-nowrap text-center text-black">
                            축하글을 수정하거나 삭제하시겠어요?</h3>

                        <div className="flex flex-row justify-center gap-[12px]">
                            <CustomButton
                                onClick={() => navigate('/editing')}
                                className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                            >축하글 수정하기</CustomButton>
                            <CustomButton
                                onClick={handleDelete}
                                className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                            >축하글 삭제하기</CustomButton>
                        </div>

                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}

export default EditDeleteBottomSheet;