import axios from 'axios';

// 카카오 로그인 응답 인터페이스
interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'https://api.photory.site',
  timeout: 10000,
  withCredentials: true, // HttpOnly 쿠키 자동 전송을 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

// 카카오 로그인 API 함수들
export const kakaoLoginAPI = {
  // 카카오 인증 URL 생성
  getAuthUrl: (): string => {
    const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = 'http://localhost:3000/login/kakao/callback';
    
    if (!KAKAO_REST_API_KEY) {
      throw new Error('카카오 API 키가 설정되지 않았습니다.');
    }
    
    return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code`;
  },
  
  // 카카오 로그인 페이지로 리다이렉트
  redirectToKakao: (): void => {
    const authUrl = kakaoLoginAPI.getAuthUrl();
    window.location.href = authUrl;
  },
  
  // 인가 코드로 카카오 로그인 처리
  loginWithCode: async (code: string): Promise<{ data: KakaoLoginResponse; tokens: { accessToken?: string } }> => {
    try {
      console.log('카카오 로그인 요청:', { code: code.substring(0, 20) + '...' });
      
      const response = await apiClient.post<KakaoLoginResponse>('/api/auth/kakao/login', null, {
        params: { code },
        headers: {
          'accept': '*/*',
        },
      });

      // 헤더에서 Access Token만 추출 (Refresh Token은 HttpOnly 쿠키로 전송됨)
      const accessToken = response.headers['authorization'];
      
      console.log('카카오 로그인 성공:', response.data);
      console.log('Access Token:', accessToken);
      
      return {
        data: response.data,
        tokens: {
          accessToken
        }
      };
    } catch (error: any) {
      console.error('카카오 로그인 실패:', error);
      
      if (error.response) {
        console.error('서버 응답:', error.response.data);
        throw new Error(`서버 오류: ${error.response.status} - ${error.response.data?.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
      throw error;
    }
  }
}; 