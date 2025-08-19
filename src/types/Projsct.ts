export type CountAlbumsResponse = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
        totalAlbumCount: number;
        totalLetterCount: number;
    };
};