import axios from "axios";

export async function deleteLetter(letterId: string, accessToken: string) {
  const response = await axios.delete(
    `https://api.photory.site/api/letters/${letterId}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}