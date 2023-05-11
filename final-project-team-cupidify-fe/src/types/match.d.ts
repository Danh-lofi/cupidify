declare interface IUserMatch {
    id: string;
    isSeen: boolean;
    fromAvatar: string;
    fromUserName: string;
    userFromId: string;
    toUserName: string;
    userToId: string;
    toAvatar: string;
    type: MatchType;
    createdAt: string;
}

declare interface IUserNoti {
    id: string;
    fromAvatar: string;
    userFromId: string;
    fromUserName: string;
    isSeen: boolean;
    toAvatar: string;
    userToId: string;
    toUserName: string;
    type: MatchType;
    createdAt: string;
}

declare interface ILittleHearts {
    top?: number;
    bottom?: number;
    left: number;
    tilt: number;
    width: number;
}

declare interface IMatched {
    avatar: string | null;
    name: string;
    userId: string;
}
