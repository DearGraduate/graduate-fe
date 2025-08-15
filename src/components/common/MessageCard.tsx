// src/components/common/MessageCard.tsx
import React from 'react';
import testImage from '../../assets/icons/img_default.png'
import icondots from '../../assets/icons/icon_dots.png';


export interface Message {
  name: string;
  imageUrl: string;
  message: string;
}

//API 연동 후 변경해야 할 부분
export const defaultMessages: Message[] = [
  {
    name: '테스트_졸축위',
    imageUrl: testImage,
    message: '나 자신 수고 했어 지난\n5년간 학교 다니느라',
  }
];


const MessageCard: React.FC<Message> = ({ name, imageUrl, message }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md w-full max-w-[200px] text-center">
      {/* 상단 이름 + 더보기 아이콘 */}
      <div className="flex justify-between items-center text-black font-semibold text-[14px] mb-1 font-ydestreet">
        <span>{name}</span>
        <img
          src={icondots}
          alt="더보기"
          className="w-4 h-4 object-contain"
        />      
      </div>

      <img
        src={imageUrl}
        alt={`${name}의 이미지`}
        className="w-full aspect-square object-cover rounded-xl mb-2"
      />
      <div className="bg-white text-black text-[10px] rounded-xl px-1 py-1 whitespace-pre-line">
        {message}
      </div>
    </div>
  );
};



export default MessageCard;
