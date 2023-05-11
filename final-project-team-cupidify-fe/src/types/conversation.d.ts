declare interface IConversationUser {
    userId: string;
    name: IUserName;
    avatar: string;
}
declare interface IConversation {
    conversationId: string;
    userProfile: IConversationUser;
    updatedAt: string;
    lastMessage: ILastMessage;
    createdAt: string;
}
declare interface ILastMessage {
    conversationId: string;
    content: string;
    senderId: string;
    type: TypeMessage;
    createdAt: Date;
}
