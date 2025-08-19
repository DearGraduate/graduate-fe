import axios from 'axios';

// 회원 탈퇴 응답 인터페이스
interface DeleteAccountResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}

// 회원 탈퇴 API 함수
export const deleteAccountAPI = {
  // 회원 탈퇴 처리
  deleteAccount: async (accessToken?: string): Promise<{ data: DeleteAccountResponse }> => {
    try {
      console.log('회원 탈퇴 요청');
      
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
      
      const response = await axios.post<DeleteAccountResponse>(
        `${process.env.REACT_APP_BASE_URL}/api/auth/delete`,
        null,
        {
          headers,
          timeout: 10000,
          withCredentials: true,
        }
      );
      
      console.log('회원 탈퇴 성공:', response.data);
      
      return {
        data: response.data
      };
    } catch (error: any) {
      console.error('회원 탈퇴 실패:', error);
      
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
