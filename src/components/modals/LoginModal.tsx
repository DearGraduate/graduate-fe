import { customModalStyles } from "../../styles/CustomModal";
import Modal from "react-modal";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";

interface LoginModalProps extends ModalProps {
    onLoginClick?: () => void;
}

const LoginModal = ({ isOpen, onRequestClose, onLoginClick }: LoginModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="로그인 모달"
            className="flex justify-center"
            style={{
                ...customModalStyles,
                content: {
                    ...customModalStyles.content,
                    width: '320px',
                    height: '170px',
                    minWidth: '280px',
                    minHeight: '140px',
                    maxWidth: '280px',
                    padding: '20px',
                    borderRadius: '20px',
                },
            }}
            parentSelector={() => document.querySelector('main') as HTMLElement}
        >
            <div className="flex flex-col justify-center items-center h-full gap-4">
                <h3 
                style={{ fontFamily: 'Ydestreet', fontWeight: '700' }}
                className="text-base font-semibold text-center mb-2">로그인이 필요합니다</h3>

                <div className="flex flex-row justify-center gap-3">
                    <CustomButton 
                    className="px-4 py-2 text-sm bg-white text-gray-800 rounded-full hover:bg-gray-200"
                    bgColor="white"
                    onClick={onRequestClose}>취소</CustomButton>
                    <CustomButton
                    className="px-4 py-2 text-sm"
                    onClick={onLoginClick}>로그인</CustomButton>
                </div>

            </div>
        </Modal>
    )
}

export default LoginModal;