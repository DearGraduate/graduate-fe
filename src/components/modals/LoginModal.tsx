import { customModalStyles } from "../../styles/CustomModal";
import Modal from "react-modal";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";


// interface LoginModalProps extends ModalProps {

// }

const LoginModal = ({ isOpen, onRequestClose }: ModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="로그인 모달"
            className="flex justify-center "
            style={customModalStyles}
        >
            <div className="flex flex-col justify-center items-center p-10 w-[87%] text-center">
                <h3 
                style={{ fontFamily: 'Ydestreet', fontWeight: '700' }}
                className="text-lg font-semibold mb-6 w-full whitespace-nowrap text-center">로그인이 필요합니다</h3>

                <div className="flex flex-row justify-center gap-[10px]">
                    <CustomButton 
                    className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center bg-white text-gray-800 rounded-full  hover:bg-gray-200"
                    bgColor="white">취소</CustomButton>
                    <CustomButton
                    className="px-[15px] py-[15px] w-fit whitespace-nowrap text-center"
                    >로그인</CustomButton>
                </div>

            </div>
        </Modal>
    )
}

export default LoginModal;