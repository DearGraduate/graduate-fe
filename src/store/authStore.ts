import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 인증 상태 인터페이스
interface AuthState {
  // 상태
  isLoggedIn: boolean;
  accessToken: string | null;
  
  // 액션
  login: (accessToken: string) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
  clearAuth: () => void;
}

// 인증 스토어 생성
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 초기 상태
      isLoggedIn: false,
      accessToken: null,

      // 로그인 액션
      login: (accessToken: string) => {
        set({
          isLoggedIn: true,
          accessToken,
        });
        
        // 로컬스토리지에 Access Token 저장
        localStorage.setItem('accessToken', accessToken);
      },

      // 로그아웃 액션
      logout: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
        });
        
        // 로컬스토리지에서 Access Token 제거
        localStorage.removeItem('accessToken');
      },

      // Access Token 업데이트 액션
      updateAccessToken: (token: string) => {
        set({ accessToken: token });
        localStorage.setItem('accessToken', token);
      },

      // 인증 정보 초기화 액션
      clearAuth: () => {
        set({
          isLoggedIn: false,
          accessToken: null,
        });
        localStorage.removeItem('accessToken');
      },
    }),
    {
      name: 'auth-storage', // 로컬스토리지 키 이름
      partialize: (state) => ({
        // 로컬스토리지에 저장할 상태만 선택
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
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
  const { isLoggedIn } = useAuthStore.getState();
  
  if (storedToken) {
    if (isTokenValid(storedToken)) {
      // 토큰이 유효한 경우에만 로그인 상태 유지
      if (!isLoggedIn) {
        useAuthStore.getState().updateAccessToken(storedToken);
        useAuthStore.getState().login(storedToken);
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
