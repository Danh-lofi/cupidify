declare interface IProfile {
    userId: string;
    name: string;
    gender: string;
    birthday: string;
    description: string;
    reason: string;
    avatar: string;
    height: number;
    religion: string;
    drinking: boolean;
    education: string;
    interests: IUserInterests[];
}

declare interface IUserInFo {
    user: IProfile;
    long: number;
    lat: number;
    distance: number;
}
