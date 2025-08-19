import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteAccount } from '../../hooks/useDeleteAccount';
import { useKakaoLogout } from '../../hooks/useKakaoLogout';
import left from '../../assets/icons/img_left.png';
import line from '../../assets/icons/img_line.png';
import img from '../../assets/icons/img_setting_tory.png'

const HomeSetting = () => {
  const navigate = useNavigate();
  const { handleDeleteAccount } = useDeleteAccount();
  const { handleLogout } = useKakaoLogout();

  const handleLogoutClick = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      handleLogout();
    }
  };

  return (
    <div 
    className="min-h-screen bg-main text-white px-6 py-8 space-y-8"
    style={{
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 2rem bottom max(1rem, env(safe-area-inset-bottom))',
    backgroundSize: '255px auto'
  }}>
      <img
        src={left}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
        style={{ width: '20px', height: '20px' }}
      />

      <div className="space-y-2">
        <h2 className="font-bold text-lg">마이 프로필</h2>
        <img src = {line} className="w-full" />
        <button className="text-sm text-left" onClick={() => navigate('/making')}>
          내 앨범 수정
        </button>
      </div>

      <div className="space-y-2">
      <h2 className="font-bold text-lg">계정</h2>
      <div className="flex flex-col space-y-2">
        <img src = {line} className="w-full" />
        <button className="text-sm text-left" onClick={handleLogoutClick}>로그아웃</button>
        <button className="text-sm text-left" onClick={handleDeleteAccount}>회원탈퇴</button>
      </div>
    </div>

    </div>

  );
};

export default HomeSetting;
