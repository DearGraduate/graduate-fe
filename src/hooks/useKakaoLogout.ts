import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { kakaoLogoutAPI } from '../api/kakaoLogout';
import { useAuthStore } from '../store/authStore';

interface UseKakaoLogoutReturn {
  handleLogout: () => Promise<void>;
}

export const useKakaoLogout = (): UseKakaoLogoutReturn => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuthStore();

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      // 서버에 로그아웃 요청
      const { data } = await kakaoLogoutAPI.logout();
      
      if (data.isSuccess) {
        console.log('로그아웃 성공:', data.message);
        
        // 서버 로그아웃 성공 시에만 클라이언트 상태 초기화
        authLogout();
        
        // 로그인 페이지로 리다이렉트
        navigate('/login');
      } else {
        console.error('로그아웃 실패:', data.message);
        
        // 서버 요청 실패 시 클라이언트 상태는 유지
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('로그아웃 처리 중 에러:', error);
      
      // 서버 요청 실패 시 클라이언트 상태는 유지
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      alert(`로그아웃 처리 중 오류: ${errorMessage}`);
    }
  }, [navigate, authLogout]);

  return { handleLogout };
};
