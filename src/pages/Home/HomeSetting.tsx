
import React from 'react';

const HomeSetting = () => {
  return (
    <div className="min-h-screen bg-[#445E47] text-white px-6 py-8 space-y-8">
      {/* ← 버튼 */}
      <button className="text-xl mb-4">{'<'}</button>

      {/* 마이 프로필 */}
      <section className="space-y-2">
        <h2 className="font-bold text-lg">마이 프로필</h2>
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left">내 앨범 수정</button>
      </section>

      {/* 계정 */}
      <section className="space-y-2">
        <h2 className="font-bold text-lg">계정</h2>
        <hr className="border-t border-white/30" />
        <button className="text-sm text-left">로그아웃</button>
        <button className="text-sm text-left text-white/40">회원 탈퇴</button>
      </section>
    </div>
  );
};

export default HomeSetting;
