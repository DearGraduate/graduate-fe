import Modal from "react-modal";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";
import GraduateCapIcon from "../../assets/icons/GraduateCap.png";

interface DownloadPDFModalProps extends ModalProps {
  fileName: string;
  onDownload?: () => void;
}

const DownloadPDF = ({ isOpen, onRequestClose, fileName, onDownload }: DownloadPDFModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PDF 다운로드 모달"
      style={{
        overlay: { backgroundColor: 'rgba(0,0,0,0.25)', zIndex: 1000 },
        content: {
          position: 'fixed',
          left: '50%',
          bottom: '0',
          top: 'unset', 
          transform: 'translateX(-50%)',
          width: '393px',
          height: '224px',
          border: 'none',
          background: 'transparent',
          padding: 0,
          borderRadius: 0,
          overflow: 'visible'
        }
      }}
      ariaHideApp={false}
    >
      <div className="w-[393px] h-[224px] rounded-t-[20px] bg-white flex flex-col items-center">
        <div className="w-[120px] h-[3px] rounded-[10px] mt-[6px] bg-[#D9D9D9]"></div>
        <div className="w-[279px] h-[164px] flex flex-col items-center justify-between gap-[45px] mt-[10px]">
          <div className="w-[97px] h-[18px] font-ydestreet font-bold text-[14px] leading-[100%] tracking-[0] text-center text-[#191919]">
            PDF 다운로드
          </div>
          <div className="w-[236px] h-[16px] flex flex-row items-center gap-[7px] justify-center">
            <img src={GraduateCapIcon} alt="pdf 아이콘" className="w-[16px] h-[16px]" />
            <div className="w-[213px] h-[16px] font-ydestreet font-light text-[12px] leading-[16px] tracking-[0] text-center text-[#191919] overflow-hidden text-ellipsis whitespace-nowrap flex items-end pt-[2px]">
              {fileName}
            </div>
          </div>
          <CustomButton
            bgColor="bg-button-default"
            className="w-[279px] h-[40px] rounded-[25px] px-[15px]"
            onClick={onDownload}
          >
            다운로드
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadPDF;
