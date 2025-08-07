import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/common/button';
import '../../styles/colors.css';
import '../../styles/fonts.css';
import iconChevronDown from '../../assets/icons/ic_chevron_down.png';
import { createAlbum, getAlbum, updateAlbum } from '../../api/Album';
import { useNavigate } from 'react-router-dom';


const AlbumMakingPage = () => {
  const [albumName, setAlbumName] = useState('');
  const [albumType, setAlbumType] = useState('');
  const [customAlbumType, setCustomAlbumType] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

    const navigate = useNavigate(); 


  // 앨범 정보 조회
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const album = await getAlbum();
        if (album) {
          setAlbumName(album.albumName);
          setAlbumType(album.albumType);
          if (album.albumType === '직접 입력') {
            setCustomAlbumType(album.albumType);
          }
          setDescription(album.description);
          setIsEdit(true);
        }
      } catch (err) {
        console.log('앨범이 존재하지 않음 (신규 생성)');
      }
    };

    fetchAlbum();
  }, []);

  // 생성 or 수정 요청
  const handleSubmit = async () => {
    const payload = {
      graduationDate: '2025-08-31',
      albumName,
      albumType: albumType === '직접 입력' ? customAlbumType : albumType,
      description,
    };

    try {
      if (isEdit) {
        await updateAlbum(payload);
        navigate('/sharing');
      } else {
        await createAlbum(payload);
        navigate('/sharing');
      }
    } catch (err) {
      alert('오류가 발생했어요. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-[#3F5845] text-white px-6 pt-6 pb-10 font-sans">
      <button className="text-xl mb-4">{'<'}</button>

      <h1 className="text-xl font-bold mb-1">나의 앨범 만들기</h1>
      <p className="text-sm text-[#D1D5DB] mb-8">앨범은 8월 31일부터 다운로드가 가능합니다.</p>

      <h2 className="text-lg font-semibold mb-4">기본 정보를 작성해 주세요!</h2>

      <label className="block text-sm font-medium mb-2">
        앨범 이름<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-row items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="본인 이름을 입력하세요"
          className="w-1/2 px-3 py-2 rounded-md bg-transparent border border-white text-white placeholder-white text-sm"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <span className="text-white text-sm">의</span>

        <div className="w-1/2 relative">
          {albumType === '직접 입력' ? (
            <input
              type="text"
              placeholder="앨범 유형 입력"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-white text-white placeholder-white text-sm"
              value={customAlbumType}
              onChange={(e) => setCustomAlbumType(e.target.value)}
            />
          ) : (
            <>
              <select
                className="w-full px-3 py-2 pr-8 rounded-md bg-transparent border border-white text-white text-sm appearance-none"
                value={albumType}
                onChange={(e) => setAlbumType(e.target.value)}
              >
                <option value="직접 입력">직접 입력</option>
                <option value="여름방학 앨범">여름방학 앨범</option>
                <option value="졸업 앨범">졸업 앨범</option>
                <option value="2025 상반기 앨범">2025 상반기 앨범</option>
              </select>

              <img
                src={iconChevronDown}
                alt="드롭다운"
                className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              />
            </>
          )}
        </div>
      </div>

      <label className="block text-sm font-medium mb-2">설명 (선택)</label>
      <textarea
        placeholder="이 앨범에 대한 간단한 설명을 적어 주세요."
        className="w-full h-28 px-3 py-2 rounded-md bg-transparent border border-white text-white placeholder-white text-sm resize-none mb-10"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <CustomButton
        className="w-full bg-gray-300 text-black text-sm py-3 rounded-xl"
        onClick={handleSubmit}
      >
        {isEdit ? '앨범 수정하기' : '포토앨범 제작하기'}
      </CustomButton>
    </div>
  );
};

export default AlbumMakingPage;
