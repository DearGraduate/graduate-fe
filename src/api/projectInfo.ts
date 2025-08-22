import axios from "axios";
import type { CountAlbumsResponse } from "../types/Projsct";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

// 앨범 갯수 세기 
export const countAlbums = async (): Promise<CountAlbumsResponse> => {
    const {data} = await api.get<CountAlbumsResponse>('/api/project/info');
    console.log('누적 앨범, 축하글 수 조회:', data);
    return data;
};