import { customModalStyles } from "../../styles/CustomModal";
import Modal from "react-modal";
import type { ModalProps } from "../../types/Modal";
import Xcross from "../../assets/icons/Xcross.png";
import KaKao from "../../assets/icons/KAKAOMini.png"
import Link from "../../assets/icons/Link.png"


// interface LoginModalProps extends ModalProps {

// }

const ShareModal = ({ isOpen, onRequestClose }: ModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="공유하기 모달"
            className="flex justify-center "
            style={customModalStyles}
        >
            <button className="absolute top-[11px] right-[20px] w-[24px] h-[24px]" onClick={onRequestClose}>
                <img src={Xcross} alt="나가기 버튼" />
            </button>
            <div className="flex flex-col justify-center items-center pt-6 pb-9 w-[87%] text-center">
                <h3 
                style={{ fontFamily: 'Ydestreet', fontWeight: '700' }}
                className="text-lg font-semibold mb-3 w-full whitespace-nowrap text-center">공유하기</h3>

                <div 
                style={{ fontFamily: 'Ydestreet', fontWeight: '300' }}
                className="flex flex-row justify-center gap-[10px]">
                    <button 
                    className="px-[15px] py-[15px] flex flex-col items-center gap-3 whitespace-nowrap text-center text-gray-800 hover:bg-gray-100"
                    ><img src={KaKao} height={'26px'} width={'30px'} alt="카카오" />카카오톡</button>
                    <button

                    className="px-[15px] py-[15px] flex flex-col items-center gap-3 whitespace-nowrap text-center text-gray-800  hover:bg-gray-100"
                    ><img src={Link} height={'26px'} width={'26px'} alt="링크복사" />링크복사</button>
                </div>

            </div>
        </Modal>
    )
}

export default ShareModal;