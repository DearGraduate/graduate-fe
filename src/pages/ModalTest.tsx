//import LoginModal from "../components/modals/LoginModal"
import {useState } from 'react';
import EditDeleteBottomSheet from '../components/modals/EditDeleteModal';
import ShareModal from "../components/modals/ShareModal";
import MessageCard from '../components/common/MessageCard';

const ModalTest = () =>{
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);     
    }
        const closeModal = () => {
        setModalOpen(false);
    }    

    return (
        <div className='bg-gray-300'>
        <h1>테스트</h1>
        <button onClick={openModal}>모달 열기</button>
        {/* <MessageCard name='11' imageUrl={null} message='cc' /> */}
        {/* <EditDeleteBottomSheet isOpen={modalOpen} onRequestClose={closeModal}/> */}
        
        {/* <LoginModal isOpen={modalOpen} onRequestClose={closeModal} /> */} 
        <ShareModal isOpen={modalOpen} onRequestClose={closeModal} />
        </div>
    )
}

export default ModalTest