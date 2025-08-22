import React, { useEffect, useState, useCallback, useMemo } from 'react';
import icondots from '../../assets/icons/icon_dots.png';
import EditDeleteBottomSheet from '../modals/EditDeleteModal';
import { useLetterStore } from '../../store/letterStore';

import default_img from '../../assets/icons/img_default.png';
import default1 from '../../assets/icons/default1.png';
import default2 from '../../assets/icons/default2.png';
import default3 from '../../assets/icons/default3.png';

export interface MessageProps {
  name: string;
  imageUrl?: string | null;
  message: string;
  detailClick?: () => void;
  letterId: string | number;
}

const DEFAULT_FALLBACK = default_img as unknown as string;

const DEFAULT_MAP: Record<'defaultimage1' | 'defaultimage2' | 'defaultimage3', string> = {
  defaultimage1: default1 as unknown as string,
  defaultimage2: default2 as unknown as string,
  defaultimage3: default3 as unknown as string,
};

function detectDefaultKey(raw?: string | null):
  | 'defaultimage1'
  | 'defaultimage2'
  | 'defaultimage3'
  | null {
  if (!raw) return null;
  const v = String(raw).trim().toLowerCase().replace(/\s+/g, '');
  if (v === 'defaultimage1' || v === 'default1') return 'defaultimage1';
  if (v === 'defaultimage2' || v === 'default2') return 'defaultimage2';
  if (v === 'defaultimage3' || v === 'default3') return 'defaultimage3';
  return null;
}

const MessageCard: React.FC<MessageProps> = ({
  name,
  imageUrl,
  message,
  detailClick,
  letterId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const setSelectedLetterId = useLetterStore((s) => s.setSelectedLetterId);

  // 1) 서버 문자열을 그대로 state로 관리
  const [rawPic, setRawPic] = useState<string | null>(imageUrl ?? null);
  useEffect(() => {
    setRawPic(imageUrl ?? null);
  }, [imageUrl]);

  const displaySrc = useMemo(() => {
    const key = detectDefaultKey(rawPic);
    if (key) return DEFAULT_MAP[key];

    const v = rawPic?.toString().trim();
    if (!v || v.toLowerCase() === 'null' || v.toLowerCase() === 'undefined') {
      return DEFAULT_FALLBACK;
    }
    return v;
  }, [rawPic]);

  const [shownSrc, setShownSrc] = useState(displaySrc);
  useEffect(() => setShownSrc(displaySrc), [displaySrc]);

  const handleImgError = useCallback(() => {
    if (shownSrc !== DEFAULT_FALLBACK) setShownSrc(DEFAULT_FALLBACK);
  }, [shownSrc]);

  const openModal = () => {
    setSelectedLetterId(String(letterId));
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const letterData = {
    id: String(letterId),
    writerName: name,
    message,
    isPublic: true,
    picUrl: imageUrl ?? undefined,
  };

  return (
    <div className="bg-letterBox rounded-2xl p-4 shadow-md w-full max-w-[200px] text-center">
      <div className="flex justify-between items-center text-black font-semibold text-[14px] mb-1 font-ydestreet">
        <span className="truncate">{name}</span>
        <button type="button" onClick={openModal} aria-label="더보기" className="p-1">
          <img src={icondots} alt="더보기" className="w-4 h-4 object-contain" />
        </button>
      </div>

      <EditDeleteBottomSheet
        isOpen={modalOpen}
        onRequestClose={closeModal}
        letterData={letterData}
      />

      <img
        src={shownSrc}
        alt={`${name}의 이미지`}
        className="w-[112px] h-[92px] object-cover rounded-xl mb-2 mx-auto shrink-0"
        loading="lazy"
        onError={handleImgError}
      />

      <div className="bg-white text-black font-light text-[10px] rounded-xl px-1 py-1 whitespace-pre-line break-words">
        {message}
      </div>
    </div>
  );
};

export default MessageCard;
