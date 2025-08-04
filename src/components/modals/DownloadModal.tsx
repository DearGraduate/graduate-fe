import styled from "styled-components";
import DownloadCharacter from "../../assets/images/DownloadCharacter.png";
import { ModalProps } from "../../types/Modal";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: transparent;
  border: none;
  outline: none;
`;

const DownloadContainer = styled.div`
  width: 100%;
  max-width: 388.71px;
  height: 410.43px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-17.19deg);
`;

const DownloadModal = ({ isOpen, onRequestClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <DownloadContainer>
          <img src={DownloadCharacter} alt="DownloadCharacter" />
        </DownloadContainer>
      </ModalContent>
    </ModalBackground>
  );
};

export default DownloadModal;
