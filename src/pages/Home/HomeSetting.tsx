import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';

const HomeSetting = () => {
  const navigate = useNavigate();
  const { handleDeleteAccount } = useDeleteAccount();

  return (
    <div className="min-h-screen bg-[#445E47] text-white px-6 py-8 space-y-8">
      <button className="text-xl mb-4">{'<'}</button>

      <div className="space-y-2">
        <h2 className="font-bold text-lg">마이 프로필</h2>
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left" onClick={() => navigate('/making')}>
          내 앨범 수정
        </button>
      </div>

      <div className="space-y-2">
      <h2 className="font-bold text-lg">계정</h2>
      <div className="flex flex-col space-y-2">
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left">로그아웃</button>
        <button 
          className="text-sm text-left" 
          onClick={handleDeleteAccount}
        >
          회원탈퇴
        </button>
      </div>
    </div>
    </div>
  );
};

export default HomeSetting;
