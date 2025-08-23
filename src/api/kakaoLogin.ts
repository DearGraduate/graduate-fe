import axios from 'axios';

// 카카오 로그인 응답 인터페이스
interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    albumExists: boolean; // 서버가 주는 정보 (상위에서 사용할지 여부 결정)
    albumId: number;      // 서버가 주는 앨범 ID (게스트 없을 때 폴백 용도로만 사용)
  };
}

// (유지용) 공통 응답 제네릭 — 현재 파일에서는 직접 사용하지 않지만 타입 호환 위해 남김
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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

    // 환경에 따라 리다이렉트 URI 설정 (개발 예시)
    const REDIRECT_URI = 'https://www.photory.site/login/kakao/callback';

    if (!KAKAO_REST_API_KEY) {
      throw new Error('카카오 API 키가 설정되지 않았습니다.');
    }

    return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code`;
  },

  // 카카오 로그인 페이지로 리다이렉트
  redirectToKakao: (): void => {
    const authUrl = kakaoLoginAPI.getAuthUrl();
    window.location.href = authUrl;
  },

  loginWithCode: async (
    code: string
  ): Promise<{
    data: KakaoLoginResponse;
    tokens: { accessToken?: string };
    hasAlbum: boolean;
    albumId?: number;
  }> => {
    try {
      console.log('카카오 로그인 요청:', { code: code.substring(0, 20) + '...' });

      const response = await apiClient.post<KakaoLoginResponse>(
        '/api/auth/kakao/login',
        null,
        {
          params: { code },
          headers: { accept: '*/*' },
        }
      );

      // 응답 헤더에서 Access Token만 추출 (Refresh Token은 HttpOnly 쿠키)
      const accessToken = response.headers['authorization'];
      const cleanToken =
        accessToken?.startsWith('Bearer ') ? accessToken.substring(7) : accessToken;

      console.log('카카오 로그인 성공:', response.data);
      console.log('Access Token:', cleanToken);

      // 추가 조회 없이 서버 응답 그대로 전달
      const hasAlbum = Boolean(response.data?.result?.albumExists);
      const albumId = response.data?.result?.albumId;

      return {
        data: response.data,
        tokens: { accessToken: cleanToken },
        hasAlbum,
        albumId, // 상위에서: "게스트 스토어가 있으면 게스트 우선, 없으면 이 값 폴백"
      };
    } catch (error: any) {
      console.error('카카오 로그인 실패:', error);

      if (error.response) {
        console.error('서버 응답:', error.response.data);
        throw new Error(
          `서버 오류: ${error.response.status} - ${
            error.response.data?.message || '알 수 없는 오류'
          }`
        );
      } else if (error.request) {
        throw new Error('서버로부터 응답을 받지 못했습니다.');
      }
      throw error;
    }
  },
};
