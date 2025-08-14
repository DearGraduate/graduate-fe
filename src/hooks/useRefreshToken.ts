import { useCallback } from 'react';
import { refreshTokenAPI } from '../api/refreshToken';
import { useAuthStore } from '../store/authStore';

interface UseRefreshTokenReturn {
  refreshToken: () => Promise<boolean>;
  refreshTokenIfNeeded: () => Promise<boolean>;
}

export const useRefreshToken = (): UseRefreshTokenReturn => {
  const { updateAccessToken, isTokenExpiringSoon, logout } = useAuthStore();

  // 토큰 재발급 함수
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      console.log('토큰 재발급 시작');
      
      // 현재 토큰 가져오기
      const currentToken = useAuthStore.getState().accessToken;
      
      const { data, newAccessToken, expiresAt } = await refreshTokenAPI.refreshAccessToken(currentToken || undefined);
      
      if (data.isSuccess && newAccessToken) {
        console.log('토큰 재발급 성공');
        
        // 새로운 토큰과 만료 시간을 스토어에 저장
        updateAccessToken(newAccessToken, expiresAt || undefined);
        
        return true;
      } else {
        console.error('토큰 재발급 실패:', data.message);
        return false;
      }
    } catch (error) {
      console.error('토큰 재발급 중 에러:', error);
      
      // 재발급 실패 시 로그아웃 처리
      logout();
      return false;
    }
  }, [updateAccessToken, logout]);

  // 토큰이 곧 만료될 때만 재발급하는 함수
  const refreshTokenIfNeeded = useCallback(async (): Promise<boolean> => {
    if (isTokenExpiringSoon()) {
      console.log('토큰이 곧 만료됩니다. 재발급을 시도합니다.');
      return await refreshToken();
    }
    
    console.log('토큰이 아직 유효합니다. 재발급이 필요하지 않습니다.');
    return true;
  }, [isTokenExpiringSoon, refreshToken]);

  return {
    refreshToken,
    refreshTokenIfNeeded,
  };
};
