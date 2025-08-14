import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 상태 인터페이스
interface AuthState {
  // 상태
  isLoggedIn: boolean;
  accessToken: string | null;
  tokenExpiresAt: number | null; // 토큰 만료 시간 (밀리초)
  
  // 액션
  login: (accessToken: string, expiresAt?: number) => void;
  logout: () => void;
  updateAccessToken: (token: string, expiresAt?: number) => void;
  clearAuth: () => void;
  isTokenExpiringSoon: () => boolean; // 토큰이 곧 만료될지 확인 (5분 전)
}

// 인증 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isLoggedIn: false,
      accessToken: null,
      tokenExpiresAt: null,

      // 로그인 액션
      login: (accessToken: string, expiresAt?: number) => {
        set({
          isLoggedIn: true,
          accessToken,
          tokenExpiresAt: expiresAt || null,
        });
        
        // 로컬스토리지에 Access Token과 만료 시간 저장
        localStorage.setItem('accessToken', accessToken);
        if (expiresAt) {
          localStorage.setItem('tokenExpiresAt', expiresAt.toString());
        }
      },

      // 로그아웃 액션
      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          tokenExpiresAt: null,
        });
        
        // 로컬스토리지에서 Access Token과 만료 시간 제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiresAt');
      },

      // Access Token 업데이트 액션
      updateAccessToken: (token: string, expiresAt?: number) => {
        set({ 
          accessToken: token,
          tokenExpiresAt: expiresAt || null,
        });
        localStorage.setItem('accessToken', token);
        if (expiresAt) {
          localStorage.setItem('tokenExpiresAt', expiresAt.toString());
        }
      },

      // 인증 정보 초기화 액션
      clearAuth: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
          tokenExpiresAt: null,
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiresAt');
      },

      // 토큰이 곧 만료될지 확인 (5분 전)
      isTokenExpiringSoon: () => {
        const { tokenExpiresAt } = get();
        if (!tokenExpiresAt) return false;
        
        const now = Date.now();
        const fiveMinutesFromNow = now + (5 * 60 * 1000); // 5분 후
        
        return tokenExpiresAt <= fiveMinutesFromNow;
      },
    }),
    {
      name: 'auth-storage', // 로컬스토리지 키 이름
      partialize: (state) => ({
        // 로컬스토리지에 저장할 상태만 선택
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        tokenExpiresAt: state.tokenExpiresAt,
      }),
    }
  )
);

// 토큰 유효성 검증 함수
const isTokenValid = (token: string): boolean => {
  try {
    // JWT 토큰 구조 확인 (header.payload.signature)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // payload 디코딩
    const payload = JSON.parse(atob(parts[1]));
    
    // 만료 시간 확인
    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return false; // 토큰 만료
    }
    
    return true;
  } catch (error) {
    return false; // 토큰 파싱 실패
  }
};

// 초기화 함수: 페이지 로드 시 토큰 유효성 검증
export const initializeAuth = () => {
  const storedToken = localStorage.getItem('accessToken');
  const storedExpiresAt = localStorage.getItem('tokenExpiresAt');
  const { isLoggedIn } = useAuthStore.getState();
  
  if (storedToken) {
    if (isTokenValid(storedToken)) {
      // 토큰이 유효한 경우에만 로그인 상태 유지
      if (!isLoggedIn) {
        const expiresAt = storedExpiresAt ? parseInt(storedExpiresAt) : undefined;
        useAuthStore.getState().updateAccessToken(storedToken, expiresAt);
        useAuthStore.getState().login(storedToken, expiresAt);
      }
    } else {
      // 토큰이 만료되었거나 유효하지 않은 경우
      console.log('토큰이 만료되었습니다. 로그아웃 처리합니다.');
      useAuthStore.getState().clearAuth();
    }
  } else if (isLoggedIn) {
    // 토큰이 없는데 로그인 상태인 경우
    console.log('토큰이 없습니다. 로그아웃 처리합니다.');
    useAuthStore.getState().clearAuth();
  }
};
