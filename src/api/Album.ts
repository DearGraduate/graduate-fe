import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const withBearer = (t: string) => (t.startsWith('Bearer ') ? t : `Bearer ${t}`);

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

interface GetAlbumResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Album;
}

interface Album {
  albumName: string;
  albumType: string;
  description: string;
  graduationDate: string;
}

// 앨범 생성
export const createAlbum = async (data: CreateAlbumRequest): Promise<CreateAlbumResponse> => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) throw new Error('AccessToken이 존재하지 않습니다.');

  const response = await axios.post<CreateAlbumResponse>(
    `${BASE_URL}/api/albums`,
    data,
    {
      headers: {
        Authorization: withBearer(accessToken), 
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// 앨범 조회
export const getAlbum = async (): Promise<Album> => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) throw new Error('AccessToken이 존재하지 않습니다.');

  const response = await axios.get<GetAlbumResponse>(`${BASE_URL}/api/albums`, {
    headers: {
      Authorization: withBearer(accessToken), 
    },
    withCredentials: true,
  });
  return response.data.result;
};

// 앨범 수정
export const updateAlbum = async (data: CreateAlbumRequest): Promise<CreateAlbumResponse> => {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken) throw new Error('AccessToken이 존재하지 않습니다.');

  const response = await axios.patch<CreateAlbumResponse>(
    `${BASE_URL}/api/albums`,
    data,
    {
      headers: {
        Authorization: withBearer(accessToken), 
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
  return response.data;
};