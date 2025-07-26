import { useCallback } from 'react';
import { kakaoAuth } from '../api/auth';

interface UseKakaoAuthReturn {
  handleKakaoLogin: () => void;
}

export const useKakaoAuth = (): UseKakaoAuthReturn => {
  const handleKakaoLogin = useCallback((): void => {
    try {
      kakaoAuth.redirectToKakao();
    } catch (error) {
      console.error('카카오 로그인 리다이렉트 에러:', error);
      alert('카카오 로그인 설정에 문제가 있습니다. 관리자에게 문의해주세요.');
    }
  }, []);

  return { handleKakaoLogin };
}; 