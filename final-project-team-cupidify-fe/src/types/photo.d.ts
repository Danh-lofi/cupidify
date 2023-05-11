declare interface IPhoto {
    id: string;
    isFavorite: boolean;
    photoUrl: string;
    publicId: string;
}

declare interface IUploadUserAlbumsResponse extends IResponseSuccess {
    data: IAlbums[];
}
