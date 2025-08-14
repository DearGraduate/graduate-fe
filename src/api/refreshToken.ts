import axios from 'axios';

// 토큰 재발급 응답 인터페이스
interface RefreshTokenResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

// axios 인스턴스 생성 (다른 API와 동일)
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 10000,
  withCredentials: true, // HttpOnly 쿠키 자동 전송을 위해 필요
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 재발급 API 함수
export const refreshTokenAPI = {
  // 액세스 토큰 재발급
  refreshAccessToken: async (accessToken?: string): Promise<{ 
    data: RefreshTokenResponse; 
    newAccessToken: string | null;
    expiresAt: number | null;
  }> => {
    try {
      console.log('액세스 토큰 재발급 요청');
      
      const headers: Record<string, string> = {
        'accept': '*/*',
      };
      
      // Access Token이 있으면 Authorization 헤더에 추가 (Bearer 중복 방지)
      if (accessToken) {
        const cleanToken = accessToken.startsWith('Bearer ') 
          ? accessToken.substring(7) 
          : accessToken;
        
        headers['Authorization'] = `Bearer ${cleanToken}`;
      }
      
      const response = await apiClient.post<RefreshTokenResponse>(
        '/api/auth/refresh',
        null,
        {
          headers,
        }
      );
      
      // 헤더에서 새로운 Access Token 추출
      const newAccessToken = response.headers['authorization'];
      
      // JWT에서 만료 시간 추출
      let expiresAt: number | null = null;
      if (newAccessToken) {
        try {
          const tokenParts = newAccessToken.replace('Bearer ', '').split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            expiresAt = payload.exp * 1000; // Unix timestamp를 밀리초로 변환
          }
        } catch (error) {
          console.error('토큰 파싱 실패:', error);
        }
      }
      
      console.log('액세스 토큰 재발급 성공:', response.data);
      console.log('새로운 Access Token:', newAccessToken);
      console.log('만료 시간:', expiresAt ? new Date(expiresAt).toLocaleString() : '알 수 없음');
      
      return {
        data: response.data,
        newAccessToken: newAccessToken || null,
        expiresAt
      };
    } catch (error: any) {
      console.error('액세스 토큰 재발급 실패:', error);
      
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
