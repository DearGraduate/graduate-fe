import React, { useEffect, useState } from 'react';
import Select from 'react-select';  // react-select import
import CustomButton from '../../components/common/button';
import '../../styles/colors.css';
import '../../styles/fonts.css';
import left from '../../assets/icons/img_left.png';
import { createAlbum, getAlbum, updateAlbum } from '../../api/Album';
import { useNavigate } from 'react-router-dom';

const AlbumMakingPage = () => {
  const [albumName, setAlbumName] = useState('');
  const [albumType, setAlbumType] = useState('');
  const [customAlbumType, setCustomAlbumType] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const albumTypeOptions = [
    { value: '직접 입력', label: '직접 입력' },
    { value: '여름방학 앨범', label: '여름방학 앨범' },
    { value: '졸업 앨범', label: '졸업 앨범' },
    { value: '2025 상반기 앨범', label: '2025 상반기 앨범' },
  ];

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
        //console.log('앨범이 존재하지 않음 (신규 생성)');
      }
    };

    fetchAlbum();
  }, []);

  // 생성 or 수정 요청
  const handleSubmit = async () => {
    const payload = {
      graduationDate: '2025.08.31',
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

  // 앨범 유형 변경 핸들러
  const handleAlbumTypeChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      setAlbumType(selectedOption.value);
      if (selectedOption.value === '졸업 앨범') {
        setCustomAlbumType('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#3F5845] text-white px-6 pt-8 pb-10 font-sans">
      <img
        src={left}
        className="cursor-pointer"
        onClick={() => navigate(-1)}
        style={{ width: '20px', height: '20px' }}
      />

      <h1 className="text-[24px] font-semibold text-white pt-6">나의 앨범 만들기</h1>
      <p className="text-[14px] text-white mb-8">앨범은 8월 31일부터 다운로드가 가능합니다.</p>

      <h1 className="text-[24px] semibold text-white pt-6 mb-3">기본 정보를 작성해 주세요!</h1>

      <label className="text-[14px] text-white font-medium">
        앨범 이름<span className="text-[#FF8F8F]"> *</span>
      </label>
      <div className="flex flex-row items-center gap-2 pt-2 mb-4">
        <input
          type="text"
          placeholder="본인 이름을 입력하세요"
          className="w-1/2 px-3 py-2 rounded-md bg-transparent border border-[0.5px] border-line text-white placeholder-gray text-[10px] font-light "
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <span className="text-white text-[14px]">의</span>

       <div className="w-1/2 relative">
  <Select
    options={albumTypeOptions}
    onChange={handleAlbumTypeChange}  // selectedOption 처리
    value={albumTypeOptions.find((option) => option.value === albumType)}
    styles={{
      control: (provided) => ({
        ...provided,
        width: '100%',
        padding: '0px',
        borderColor: 'gray',
        borderWidth: '0.5px',
        borderRadius: '0.375rem',
        backgroundColor: 'transparent',
      }),
      option: (provided) => ({
        ...provided,
        backgroundColor: '#445E47',
        color: 'white',
        padding: '10px',
        fontSize: '10px',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'white',
        fontSize: '10px',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#bbb',
        fontSize: '10px',
      }),
    }}
    placeholder="앨범 유형을 선택하세요"
  />

  {/* '직접 입력'을 선택한 경우에만 input 필드 추가 */}
  {albumType === '직접 입력' && (
    <input
      type="text"
      placeholder="앨범 유형을 입력하세요"
      className="w-full mt-2 px-3 py-2 rounded-md bg-transparent border border-[0.5px] border-white text-white placeholder-gray text-[10px] font-light"
      value={customAlbumType}
      onChange={(e) => setCustomAlbumType(e.target.value)}
    />
  )}
</div>

      </div>

      <label className="block text-sm font-medium mb-2">설명 (선택)</label>
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