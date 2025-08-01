import { Sheet, SheetRef } from "react-modal-sheet";
import { useRef, useState } from "react";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";
export const SHEET_SNAP_POINTS = [0.7, 0.5, 0.3];
export const SHEET_INITIAL_SNAP = 2;

const EditDeleteBottomSheet = ({ isOpen, onRequestClose }: ModalProps) => {
    const ref = useRef<SheetRef>(null);
    const [, setSnapPoint] = useState<number>(SHEET_INITIAL_SNAP);

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
                className="bg-white rounded-t-[40px] h-[15vh] w-full"
            >
                <Sheet.Header />
                <Sheet.Content>
                    <div className="flex flex-col justify-center items-center p-10 w-full text-center mb-5">
                        <h3
                            style={{ fontFamily: 'Ydestreet', fontWeight: '700', fontSize:'14px' }}
                            className="text-lg font-semibold mb-6 w-full whitespace-nowrap text-center text-black">
                            축하글을 수정하거나 삭제하시겠어요?</h3>

                        <div className="flex flex-row justify-center gap-[12px]">
                            <CustomButton
                                className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                            >축하글 수정하기</CustomButton>
                            <CustomButton
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