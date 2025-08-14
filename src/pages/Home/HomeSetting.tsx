import React from 'react';
import { useNavigate } from 'react-router-dom';
import left from '../../assets/icons/img_left.png'
import footerImage from '../../assets/icons/img_setting_photory.png'; 


const HomeSetting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#445E47] text-white px-6 py-8 space-y-8">
    <img src={left} className="cursor-pointer" onClick={() => navigate(-1)} style={{ width: '24px', height: '24px' }} />

      <div className="space-y-2">
        <h2 className="font-bold text-[14px] font-ydestreet">마이 프로필</h2>
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left" onClick={() => navigate('/making')}>
          내 앨범 수정
        </button>
      </div>

      <div className="space-y-2">
      <h2 className="font-bold text-[14px] font-ydestreet">계정</h2>
      <div className="flex flex-col space-y-2">
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left">로그아웃</button>
        <button className="text-sm text-left">회원탈퇴</button>
      </div>
    </div>
          <div className="flex justify-center mt-8">
        <img src={footerImage} alt="footer" className="w-32 h-32" />
      </div>
    </div>
  );
};

export default HomeSetting;
