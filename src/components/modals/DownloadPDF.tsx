import Modal from "react-modal";
import type { ModalProps } from "../../types/Modal";
import CustomButton from "../common/button";
import GraduateCapIcon from "../../assets/icons/GraduateCap.png";
import styled from "styled-components";

const Container = styled.div`
  width: 393px;
  height: 224px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GrayBar = styled.div`
  width: 120px;
  height: 3px;
  border-radius: 10px;
  margin-top: 6px;
  background: #D9D9D9;
`;

const ContentBox = styled.div`
  width: 279px;
  height: 164px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 45px;
  margin-top: 10px;
`;

const Title = styled.div`
  width: 97px;
  height: 18px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;
  color: #191919;
`;

const FileNameBox = styled.div`
  width: 236px;
  height: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  justify-content: center;
`;

const FileIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const FileNameText = styled.div`
  width: 213px;
  height: 16px;
  font-family: 'Ydestreet', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0;
  text-align: center;
  color: #191919;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: flex-end;
  padding-top: 2px;
`;

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
      <Container>
        <GrayBar />
        <ContentBox>
          <Title>PDF 다운로드</Title>
          <FileNameBox>
            <FileIcon src={GraduateCapIcon} alt="pdf 아이콘" />
            <FileNameText>{fileName}</FileNameText>
          </FileNameBox>
          <CustomButton
            bgColor="bg-button-default"
            className="w-[279px] h-[40px] rounded-[25px] px-[15px]"
            onClick={onDownload}
          >
            다운로드
          </CustomButton>
        </ContentBox>
      </Container>
    </Modal>
  );
};

export default DownloadPDF;
