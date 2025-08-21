import axios from "axios";

export async function editLetter(letterId: string, accessToken: string, writerName: string, message: string, isPublic: boolean) {
  const formData = new FormData();
  const jsonData = new Blob(
    [JSON.stringify({ writerName, message, isPublic })],
    { type: "application/json" }
  );
  formData.append("data", jsonData);

  const response = await axios.patch(
    `https://api.photory.site/api/letters/${letterId}`,
    formData,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}
