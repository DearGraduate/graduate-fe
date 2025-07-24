// src/pages/AlbumMakingPage.tsx
import CustomButton from "../components/common/button"; 
import '../styles/colors.css'; 
import '../styles/fonts.css';
import React, { useState } from 'react';
import iconChevronDown from '../assets/icons/ic_chevron_down.png'; 

const AlbumMakingPage = () => {
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("07");
  const [day, setDay] = useState("25");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="min-h-screen bg-[#415940] text-white px-6 py-10 space-y-5">
      <button className="text-white text-2xl mr-14">&lt;</button>

      {/* 날짜 선택 */}
      <div className="space-y-3">
        <h2
          style={{ fontFamily: 'Pretendard', fontWeight: 700 }}
          className="text-2xl"
        >
          졸업식 날짜가 언제 인가요?
        </h2>
        <p className="text-sm text-gray-200">
          졸업식 날짜를 선택해 주세요! <br />
          해당 날짜부터 졸업 앨범이 다운로드 됩니다
        </p>

          <div className="flex space-x-3">
          {/* 연도 */}
          <div className="relative">
            <select
              className="appearance-none text-black rounded-full px-4 py-2 pr-6 w-[100px]"
              style={{ backgroundColor: 'var(--color-button-calander)' }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="2025">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <img
              src={iconChevronDown}
              alt="year"
              className="w-3 h-3 absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

          {/* 월 */}
          <div className="relative">
            <select
              className="appearance-none text-black rounded-full px-4 py-2 pr-6 w-[80px]"
              style={{ backgroundColor: 'var(--color-button-calander)' }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <img
              src={iconChevronDown}
              alt="month"
              className="w-3 h-3 absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>

          {/* 일 */}
          <div className="relative">
            <select
              className="appearance-none text-black rounded-full px-4 py-2 pr-6 w-[70px]"
              style={{ backgroundColor: 'var(--color-button-calander)' }}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>
                  {String(i + 1).padStart(2, '0')}
                </option>
              ))}
            </select>
            <img
              src={iconChevronDown}
              alt="day"
              className="w-3 h-3 absolute right-[10px] top-1/2 -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* 기본 정보 입력 */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold font-pretendard mt-[45px]">

          기본 정보를 작성해 주세요!
        </h2>
<div>
  <label className="text-[14pt] font-medium font-pretendard">
    앨범 제작자 이름 <span className="text-red-500">*</span>
  </label>
<input
  className="w-full mt-1 p-2 rounded border-[0.5px] bg-transparent focus:outline-none focus:ring-2
             text-[14pt] font-medium font-pretendard
             placeholder:text-[10pt] placeholder:font-normal placeholder-font-pretendard
             placeholder:text-[#d4d4d4] placeholder:opacity-50"
  style={{
    borderColor: 'var(--color-line)',
    color: 'white',
    caretColor: 'white',
  }}
  placeholder="예: 한성과학고 퀸, 졸업앨범"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>




</div>

<div>
  <label className="text-[14pt] font-medium font-pretendard">
    설명 (선택)
  </label>
  <textarea
    className="w-full mt-1 p-2 rounded border-[0.5px] bg-transparent
               focus:outline-none focus:ring-2
               text-[14pt] font-medium font-pretendard
               placeholder:text-[10pt] placeholder:font-normal placeholder-font-pretendard
               placeholder:text-[#d4d4d4] placeholder:opacity-50"
    style={{
      borderColor: 'var(--color-line)',
      color: 'white',
      caretColor: 'white',
    }}
    placeholder="이 앨범에 대한 간단한 설명을 적어 주세요."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />
</div>

      </div>

      {/* 버튼 */}
      <div className="pt-10">
        <CustomButton className="w-full">포토앨범 제작하기</CustomButton>
      </div>
    </div>
  );
};

export default AlbumMakingPage;

