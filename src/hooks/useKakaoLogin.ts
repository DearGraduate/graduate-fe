import { useCallback } from 'react';
import { kakaoLoginAPI } from '../api/kakaoLogin';

interface UseKakaoLoginReturn {
  handleKakaoLogin: () => void;
}

export const useKakaoLogin = (): UseKakaoLoginReturn => {
  const handleKakaoLogin = useCallback((): void => {
    try {
      kakaoLoginAPI.redirectToKakao();
    } catch (error) {
      console.error('카카오 로그인 리다이렉트 에러:', error);
      alert('카카오 로그인 설정에 문제가 있습니다. 관리자에게 문의해주세요.');
    }
  }, []);

  return { handleKakaoLogin };
}; 