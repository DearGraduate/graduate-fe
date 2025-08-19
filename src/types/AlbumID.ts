export type AlbumIDprops = { 
    isSuccess : boolean;
    code : string;
    message : string;
    result: {
        id : number;
        albumName : string;
        albumType : string;
        description : string;
        graduationDate : string;
        createdAt : string;
    };
};