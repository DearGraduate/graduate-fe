import DownloadCharacter from "../../assets/images/DownloadCharacter.png";
import { ModalProps } from "../../types/Modal";

const DownloadModal = ({ isOpen, onRequestClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm z-[1000] flex justify-center items-center"
      onClick={onRequestClose}
    >
      <div 
        className="relative bg-transparent border-none outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[388.71px] h-[410.43px] flex items-center justify-center -rotate-[17.19deg]">
          <img src={DownloadCharacter} alt="DownloadCharacter" />
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
