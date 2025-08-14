import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
export interface CreateLetterRequest {
  writer_name: string;
  pic_url: string;
  message: string;
  isPublic: boolean;
}

export interface CreateLetterResponse {
  httpStatus: string;
  isSuccess: boolean;
  code: string;
  message: string;
}

export const createGraduationLetter = async (
  albumId: string,
  data: CreateLetterRequest,
  accessToken?: string 
): Promise<CreateLetterResponse> => {
  const response = await axios.post<CreateLetterResponse>(
    `${BASE_URL}/api/albums/${albumId}/letter`,
    data,
    {
      headers: {
        ...(accessToken ? { Authorization: accessToken } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
