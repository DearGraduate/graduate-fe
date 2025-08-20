import React from 'react'
import testImage from '../../assets/icons/img_default.png'
import icondots from '../../assets/icons/icon_dots.png'
import EditDeleteBottomSheet from '../modals/EditDeleteModal'
import {useState } from 'react';

export interface MessageProps {
  name: string
  imageUrl?: string | null 
  message: string
  detailClick?: () => void  
}

const MessageCard: React.FC<MessageProps> = ({ name, imageUrl, message, detailClick }) => {  const src = imageUrl && imageUrl.trim() !== '' ? imageUrl : (testImage as unknown as string)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
        setModalOpen(true);     
    }
        const closeModal = () => {
        setModalOpen(false);
    }   

  return (
    <div className="bg-letterBox rounded-2xl p-4 shadow-md w-full max-w-[200px] text-center">
      {/* 상단 이름 + 더보기 아이콘 */}
      <div className="flex justify-between items-center text-black font-semibold text-[14px] mb-1 font-ydestreet">
        <span className="truncate">{name}</span>
        <button type="button" onClick={openModal} aria-label="더보기" className="p-1">
          <img src={icondots} alt="더보기" className="w-4 h-4 object-contain" />
        </button>
      </div>
      
      <EditDeleteBottomSheet isOpen={modalOpen} onRequestClose={closeModal}/>

      <img
        src={src}
        alt={`${name}의 이미지`}
        className="w-full aspect-square object-cover rounded-xl mb-2"
        loading="lazy"
      />

      <div className="bg-white text-black font-light text-[10px] rounded-xl px-1 py-1 whitespace-pre-line break-words">
        {message}
      </div>
    </div>
  )
}

export default MessageCard
