import React, { useEffect, useRef, useState } from 'react';
// import Select from 'react-select';  // ← 사용 안 함
import CustomButton from '../../components/common/button';
import '../../styles/colors.css';
import '../../styles/fonts.css';
import left from '../../assets/icons/img_left.png';
import toggleIcon from '../../assets/icons/img_toggle.png'; 
import { createAlbum, getAlbum, updateAlbum } from '../../api/Album';
import { useNavigate } from 'react-router-dom';

const OPTIONS = ['직접 입력', '여름방학 앨범', '졸업 앨범', '2025 상반기 앨범'] as const;
const DIRECT = '직접 입력';

const AlbumMakingPage = () => {
  const [albumName, setAlbumName] = useState('');
  const [albumType, setAlbumType] = useState(DIRECT);   
  const [customAlbumType, setCustomAlbumType] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const [open, setOpen] = useState(false); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const LIMIT = 5;
  const len = albumName.length;
  const isLimitReached = albumName.length >= LIMIT;

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // 앨범 정보 조회
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album = await getAlbum();
        if (album) {
          setAlbumName(album.albumName);
          if (OPTIONS.includes(album.albumType as any) && album.albumType !== DIRECT) {
            setAlbumType(album.albumType);
            setCustomAlbumType('');
          } else {
            setAlbumType(DIRECT);    
            setCustomAlbumType(album.albumType);
          }
          setDescription(album.description);
          setIsEdit(true);
        }
      } catch {
        // 신규 생성 케이스
      }
    };
    fetchAlbum();
  }, []);

  // 생성 or 수정 요청
  const handleSubmit = async () => {
    const payload = {
      graduationDate: '2025.08.31',
      albumName,
      albumType: albumType === DIRECT ? customAlbumType : albumType, // 최종 문자열
      description,
    };

    try {
      if (isEdit) {
        await updateAlbum(payload);
      } else {
        await createAlbum(payload);
      }
      navigate('/sharing');
    } catch {
      alert('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  const effectiveLabel =
    albumType === DIRECT ? (customAlbumType || '직접 입력') : albumType;

  const pick = (value: string) => {
    setAlbumType(value);
    if (value !== DIRECT) setCustomAlbumType('');
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#3F5845] text-white px-6 pt-8 pb-10 font-sans">
      <img
        src={left}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
        style={{ width: '20px', height: '20px' }}
        alt="뒤로"
      />

      <h1 className="text-[24px] font-semibold text-white pt-6">나의 앨범 만들기</h1>
      <p className="text-[14px] text-white mb-8">앨범은 8월 31일부터 다운로드가 가능합니다.</p>

      <h1 className="text-[24px] semibold text-white pt-6 mb-3">기본 정보를 작성해 주세요!</h1>

      <label className="text-[14px] text-white font-medium">
        앨범 이름<span className="text-[#FF8F8F]"> *</span>
      </label>
      <div className="flex flex-row items-center gap-2 pt-2 mb-4">
  <div className="w-1/2 flex flex-col">
    <input
      type="text"
      placeholder="본인 이름을 입력하세요"
      className={[
        "px-3 py-3 rounded-md bg-transparent border border-[0.5px] border-line",
        "text-white placeholder-gray text-[10px] font-light focus:outline-none focus:border-white",
        isLimitReached ? "border-[#FF2626] focus:border-[#FF2626]" : "",
      ].join(" ")}
      value={albumName}
      onChange={(e) => setAlbumName(e.target.value)}
    />

    <p
      className={`mt-1 h-4 text-[10px] transition-opacity duration-150
                  ${isLimitReached ? "opacity-100 text-[#FF2626]" : "opacity-0"}`}
      role={isLimitReached ? "alert" : undefined}
    >
      글자수는 최대 {LIMIT}자까지 가능합니다
    </p>
  </div>

  <span className="text-white text-[14px] -mt-5">의</span>

  <div className="w-1/2 relative" ref={dropdownRef}>
    <div className="flex items-center gap-2 rounded-md bg-transparent border-[0.5px] border-white px-2 py-2 -mt-5">
      {albumType === DIRECT ? (
        <input
          value={customAlbumType}
          onChange={(e) => setCustomAlbumType(e.target.value)}
          placeholder="직접 입력"
          className="flex-1 bg-transparent outline-none placeholder-white text-gray text-[10px] font-light"
        />
      ) : (
        <div className="flex-1 text-[10px] text-gray font-light">
          {effectiveLabel}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="shrink-0 p-1 -ml-4 rounded hover:bg-white/10 active:bg-white/20"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <img
          src={toggleIcon}
          alt="옵션 열기"
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>

    {open && (
      <ul
        role="listbox"
        className="absolute z-20 mt-2 w-full overflow-hidden rounded-md border-[0.5px] border-white bg-[#3F5845] shadow-lg divide-y divide-white/50 "
      >
        {OPTIONS.map((label) => (
          <li
            key={label}
            role="option"
            onClick={() => pick(label)}
            className={`cursor-pointer px-3 py-2 text-[10px] font-light hover:bg-white/10 ${
              (albumType === DIRECT && label === DIRECT) ||
              (albumType === label && label !== DIRECT)
                ? "bg-white/10"
                : ""
            }`}
          >
            {label}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


      <label className="block text-sm font-medium mb-2 mt-5">설명 (선택)</label>
      <textarea
        placeholder="이 앨범에 대한 간단한 설명을 적어 주세요."
        className="w-full h-28 px-3 py-2 rounded-md bg-transparent border border-[0.5px] border-white text-white placeholder-gray text-[10px] font-light resize-none mb-10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <CustomButton
        className="w-full bg-gray-300 text-black text-sm py-3 rounded-xl mt-14"
        onClick={handleSubmit}
      >
        {isEdit ? '앨범 수정하기' : '포토앨범 제작하기'}
      </CustomButton>
    </div>
  );
};

export default AlbumMakingPage;
