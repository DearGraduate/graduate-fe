import axios from 'axios';

// 카카오 인증 관련 API 함수들
interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: any;
}

// API 기본 URL 설정
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 추가
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 요청 에러:', error);
    if (error.code === 'ERR_NETWORK') {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    }
    throw error;
  }
);

export const kakaoAuth = {
  // 카카오 인증 URL 생성
  getAuthUrl: (): string => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    
    if (!KAKAO_REST_API_KEY || !REDIRECT_URI) {
      throw new Error('카카오 API 키 또는 리다이렉트 URI가 설정되지 않았습니다.');
    }
    
    return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  },
  
  // 카카오 로그인 페이지로 리다이렉트
  redirectToKakao: (): void => {
    const authUrl = kakaoAuth.getAuthUrl();
    window.location.href = authUrl;
  },
  
  // 인가 코드로 카카오 로그인 처리
  loginWithCode: async (code: string): Promise<KakaoLoginResponse> => {
    try {
      const response = await apiClient.post<KakaoLoginResponse>('/api/auth/kakao/login', null, {
        params: { code },
        headers: {
          'accept': '*/*',
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // 서버에서 응답이 왔지만 에러 상태인 경우
        throw new Error(`서버 오류: ${error.response.status} - ${error.response.data?.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
      throw error;
    }
  }
}; 