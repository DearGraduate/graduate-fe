// src/api/album.ts

import axios from 'axios';
import { useAuthStore } from '../store/authStore';
const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log('BASE_URL:', BASE_URL);

interface CreateAlbumRequest {
  graduationDate: string;
  albumName: string;
  albumType: string;
  description: string;
}

interface CreateAlbumResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: object; 
}

export const createAlbum = async (data: CreateAlbumRequest): Promise<CreateAlbumResponse> => {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    throw new Error('AccessToken이 존재하지 않습니다. 로그인 상태를 확인하세요.');
  }

  try {
    console.log('[앨범 생성 요청 시작]');
    console.log('보낼 데이터:', data);
    console.log('AccessToken:', accessToken);

    const response = await axios.post<CreateAlbumResponse>(
        `${BASE_URL}/api/albums`,
        data,
        {
            headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
            },
            withCredentials: true,
        }
        );

    console.log('[앨범 생성 성공]');
    console.log('응답 데이터:', response.data);

    return response.data;
  } catch (error: any) {
    console.error('[앨범 생성 실패]');
    if (error.response) {
      console.error('상태 코드:', error.response.status);
      console.error('응답 데이터:', error.response.data);
    } else if (error.request) {
      console.error('서버 응답 없음:', error.request);
    } else {
      console.error('기타 에러:', error.message);
    }
    throw error;
  }
};
