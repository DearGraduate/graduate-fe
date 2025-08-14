import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccountAPI } from '../api/deleteAccount';
import { useAuthStore } from '../store/authStore';

interface UseDeleteAccountReturn {
  handleDeleteAccount: () => Promise<void>;
}

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuthStore();

  const handleDeleteAccount = useCallback(async (): Promise<void> => {
    try {
      // 현재 저장된 Access Token 가져오기
      const currentAccessToken = useAuthStore.getState().accessToken;
      
      // 서버에 회원 탈퇴 요청
      const { data } = await deleteAccountAPI.deleteAccount(currentAccessToken || undefined);
      
      if (data.isSuccess) {
        console.log('회원 탈퇴 성공:', data.message);
        
        // 서버 회원 탈퇴 성공 시 클라이언트 상태 초기화
        authLogout();
        
        // 로그인 페이지로 리다이렉트
        navigate('/login');
      } else {
        console.error('회원 탈퇴 실패:', data.message);
        
        // 서버 요청 실패 시 클라이언트 상태는 유지
        alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('회원 탈퇴 처리 중 에러:', error);
      
      // 서버 요청 실패 시 클라이언트 상태는 유지
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      alert(`회원 탈퇴 처리 중 오류: ${errorMessage}`);
    }
  }, [navigate, authLogout]);

  return { handleDeleteAccount };
};
