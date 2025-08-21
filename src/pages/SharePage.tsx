import React, { useState, useEffect , useRef } from 'react';
import CustomButton from '../components/common/button'; 
import imgShare from '../assets/icons/img_share.png'; 
import imgHome from '../assets/icons/icon_home.png';
import ShareModal from '../components/modals/ShareModal';
import { useNavigate } from 'react-router-dom';
import DisplayAds from '../components/GoogleAdvertise/GoogleAdvertise';
import { useAlbumStore } from '../store/albumStore';
import { albumService } from '../services/albumService';
import { useShallow } from 'zustand/react/shallow'


const SharePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
      const openModal = () => {
          setModalOpen(true);     
      }
          const closeModal = () => {
          setModalOpen(false);
      }   


  const navigate = useNavigate();

  const { albumName, albumType, albumId } = useAlbumStore(
    useShallow((s) => ({
      albumName: s.albumName,
      albumType: s.albumType,
      albumId: s.albumId,
    }))
  )

  const didFetch = useRef(false)
  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    albumService.fetch().catch(() => {})
  }, [])

  // 홈 아이콘 클릭 핸들러 - 앨범 ID가 있으면 /home/{albumId}로, 없으면 /home으로 이동
  const handleHomeClick = () => {
    if (albumId) {
      navigate(`/home/${albumId}`);
    } else {
      navigate('/home');
    }
  };


  return (
    <div className="min-h-screen bg-main text-white px-6 pt-5 pb-10 flex flex-col items-center justify-between ">
      {/* 상단 홈 아이콘 */}
      <div className="w-full flex justify-start">
        <button onClick={handleHomeClick}>
        <img src={imgHome} alt="home" className="w-6 h-6" />
      </button>
      </div>

      {/* 중앙 텍스트 */}
      <div className="text-center mt-2">
        <h1 className="font-bold text-[36px] font-ydestreet leading-tight">
          {albumName ?? '이름'}
          <span className="whitespace-nowrap">의</span>
          <br />
          {albumType ?? '앨범 타입'}
        </h1>
        <p className="font-light text-[12px] font-ydestreet text-white mt-2">나는 졸업을 한다!!</p>
      </div>

      {/* 이미지 */}
      <div className="mt-[20px]">
      <img src={imgShare} alt="졸업 이미지" className="w-60 h-auto" />
      </div>
      
      <div>
        {/* <p>광고 표시</p>
        <DisplayAds client="ca-pub-2792815043332792" slot="1234567890" /> */}
      </div>

      {/* 설명 */}
      <div className="text-center text-sm px-4 mt-20 w-full">
        <p className='font-bold text-[14px] font-ydestreet'>앨범이 완성 되었어요!</p>
        <p className='font-bold text-[14px] font-ydestreet'>친구들에게 공유해 축하글을 모아보세요!</p>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full mt-8 flex flex-col gap-4">
        <CustomButton
          bgColor="bg-[#D9ECD2]"
          className="w-full font-semibold text-black"
          onClick={() => navigate('/writing')}

        >
          나에게 축하글 작성하기
        </CustomButton>

        <CustomButton
          bgColor="bg-[#D9ECD2]"
          className="w-full font-semibold text-black"
          onClick={openModal}
        >
          나의 졸업 앨범 공유하기
        </CustomButton>

        <ShareModal isOpen={modalOpen} onRequestClose={closeModal} />
      </div>
    </div>
  );
};

export default SharePage;
