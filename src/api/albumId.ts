import axios from "axios";
import type { AlbumIDprops } from "../types/AlbumID";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

//앨범 ID 조회
export const AlbumIDCheck = async (albumID : number): Promise<AlbumIDprops> => {
    const {data} = await api.get<AlbumIDprops>(`/api/albums/${albumID}`);
    console.log('앨범 ID 데이터 조회 : ', data);
    return data;
};