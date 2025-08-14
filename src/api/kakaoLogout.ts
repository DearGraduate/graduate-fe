import axios from 'axios';

// 로그아웃 응답 인터페이스
interface LogoutResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

// axios 인스턴스 생성 (kakaoLogin.ts와 동일)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true, // HttpOnly 쿠키 자동 전송을 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

// 로그아웃 API 함수
export const kakaoLogoutAPI = {
  // 로그아웃 처리
  logout: async (accessToken?: string): Promise<{ data: LogoutResponse }> => {
    try {
      console.log('로그아웃 요청');
      
      const headers: Record<string, string> = {
        'accept': '*/*',
      };
      
      // Access Token이 있으면 Authorization 헤더에 추가
      if (accessToken) {
        // Bearer 접두사가 이미 있으면 제거하고 다시 추가
        const cleanToken = accessToken.startsWith('Bearer ') 
          ? accessToken.substring(7) 
          : accessToken;
        
        headers['Authorization'] = `Bearer ${cleanToken}`;
      }
      
      const response = await apiClient.post<LogoutResponse>(
        '/api/auth/logout',
        null,
        {
          headers,
        }
      );
      
      console.log('로그아웃 성공:', response.data);
      
      return {
        data: response.data
      };
    } catch (error: any) {
      console.error('로그아웃 실패:', error);
      
      if (error.response) {
        console.error('서버 응답:', error.response.data);
        console.error('응답 상태:', error.response.status);
        throw new Error(`서버 오류: ${error.response.status} - ${error.response.data?.message || '알 수 없는 오류'}`);
      } else if (error.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
      throw error;
    }
  }
};