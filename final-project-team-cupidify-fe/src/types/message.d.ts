declare interface IMessage {
    type: 'text' | 'image' | 'audio';
    value: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}

declare interface ICreateMessage {
    conversationId: string;
    senderId: string;
    receiverId: string;
    content: string;
    isSeen: boolean;
    type: TypeMessage;
    createdAt: Date;
}

declare interface IMessageApi extends ICreateMessage {
    id: string;
}

declare interface IMessageQuery {
    conversationId: string;
    lastMessageId: string;
}
