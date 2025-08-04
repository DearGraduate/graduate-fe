import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 사용자 정보 인터페이스
interface User {
  socialId: string;
  name: string;
  email?: string;
}

// 인증 상태 인터페이스
interface AuthState {
  // 상태
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
  
  // 액션
  login: (user: User, accessToken: string) => void;
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
      user: null,
      accessToken: null,

      // 로그인 액션
      login: (user: User, accessToken: string) => {
        set({
          isLoggedIn: true,
          user,
          accessToken,
        });
        
        // 로컬스토리지에 Access Token 저장
        localStorage.setItem('accessToken', accessToken);
      },

      // 로그아웃 액션
      logout: () => {
        set({
          isLoggedIn: false,
          user: null,
          accessToken: null,
        });
        
        // 로컬스토리지에서 Access Token 제거
        localStorage.removeItem('accessToken');
        
        // 쿠키에서 Refresh Token 제거 (서버에서 처리)
        // 클라이언트에서는 HttpOnly 쿠키를 직접 삭제할 수 없으므로
        // 서버에 로그아웃 요청을 보내야 함
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
          user: null,
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
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);

// 초기화 함수: 페이지 로드 시 로컬스토리지의 토큰 확인
export const initializeAuth = () => {
  const storedToken = localStorage.getItem('accessToken');
  const { isLoggedIn, user } = useAuthStore.getState();
  
  if (storedToken && !isLoggedIn) {
    // 토큰이 있지만 로그인 상태가 아닌 경우
    // 토큰 유효성 검증이 필요할 수 있음
    useAuthStore.getState().updateAccessToken(storedToken);
  }
};
