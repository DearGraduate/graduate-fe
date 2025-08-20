import axios from "axios";

export async function editLetter(letterId: string, accessToken: string, message: string, isPublic: boolean) {
  const response = await axios.patch(
    `https://api.photory.site/api/letters/${letterId}`,
    { message, isPublic },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}
