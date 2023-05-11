declare interface IUpdateLocation {
    latitude: number;
    longitude: number;
}

declare interface IMapUserResponse {
    user: IProfile;
    long: number;
    lat: number;
    distance: number;
}
