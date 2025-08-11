import axios from "axios";

// 졸업 메시지 수정 요청 타입
export interface PatchLetterRequest {
  message?: string;
  isPublic?: boolean;
}

// 졸업 메시지 수정 응답 타입
export interface PatchLetterResponse {
  httpStatus: string;
  isSuccess: boolean;
  code: string;
  message: string;
}

// 졸업 메시지 수정 API 함수
export const patchGraduationLetter = async (
  letterId: string,
  data: PatchLetterRequest,
  accessToken?: string // 인증이 필요하다면 사용
): Promise<PatchLetterResponse> => {
  const BASE_URL = process.env.REACT_APP_BASE_URL || "https://api.photory.site";
  const response = await axios.patch<PatchLetterResponse>(
    `${BASE_URL}/api/letters/${letterId}`,
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
