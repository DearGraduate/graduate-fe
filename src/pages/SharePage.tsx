import React from 'react';
import CustomButton from '../components/common/button'; 
import imgShare from '../assets/icons/img_share.png'; 
import imgHome from '../assets/icons/icon_home.png';
import { useState } from 'react';
import ShareModal from '../components/modals/ShareModal';
import { useNavigate } from 'react-router-dom';
import DisplayAds from '../components/GoogleAdvertise/GoogleAdvertise';


const SharePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  
      const openModal = () => {
          setModalOpen(true);     
      }
          const closeModal = () => {
          setModalOpen(false);
      }   


  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-[#415940] text-white px-6 py-10 flex flex-col items-center justify-between">
      {/* 상단 홈 아이콘 */}
      <div className="w-full flex justify-start">
        <button onClick={() => navigate('/home')}>
        <img src={imgHome} alt="home" className="w-6 h-6" />
      </button>
      </div>

      {/* 중앙 텍스트 */}
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold leading-tight">박성민 의<br />졸업 축하 앨범</h1>
        <p className="text-sm text-white mt-2">드디어...졸업한다..!</p>
      </div>

      {/* 이미지 */}
      <div className="mt-10">
      <img src={imgShare} alt="졸업 이미지" className="w-60 h-auto" />
      </div>
      
      <div>
        <p>광고 표시</p>
        <DisplayAds client="ca-pub-2792815043332792" slot="1234567890" />
      </div>

      {/* 설명 */}
      <div className="text-center text-sm mt-10 px-6">
        <p>앨범이 완성 되었어요!</p>
        <p>친구들에게 공유해 축하글을 모아보세요!</p>
      </div>

      {/* 하단 버튼 */}
      <div className="w-full mt-8 flex flex-col gap-4">
        <CustomButton
          bgColor="bg-[#D9ECD2]"
          className="w-full font-semibold text-black"
          //onClick={() => console.log('나에게 축하글 작성하기')}
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
