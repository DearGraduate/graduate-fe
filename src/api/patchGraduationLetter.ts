import axios from "axios";
export interface PatchLetterRequest {
  message?: string;
  isPublic?: boolean;
}

export interface PatchLetterResponse {
  httpStatus: string;
  isSuccess: boolean;
  code: string;
  message: string;
}

export const patchGraduationLetter = async (
  letterId: string,
  data: FormData,
  accessToken?: string // 인증이 필요하다면 사용
): Promise<PatchLetterResponse> => {
  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.photory.site";
  const response = await axios.patch<PatchLetterResponse>(
    `${BASE_URL}/api/letters/${letterId}`,
    data,
    {
      headers: {
        ...(accessToken ? { Authorization: accessToken } : {}),
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
