import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { TypeMessage } from '../types/enum';
import { createConversation, getConversation } from './conversationAction';
import { getListMessage, sendPhotoMessage, setInitialMessages } from './messageAction';

interface IInitialState {
    selectMessage: IMessageApi;
    listMessages: IMessageApi[];
    listConversation: IConversation[];
    conversation: IConversation;
    totalPages: number;
    messagePage: number;
}

const initialState: IInitialState = {
    selectMessage: {
        id: '',
        conversationId: '',
        senderId: '',
        receiverId: '',
        content: '',
        isSeen: false,
        type: 'TEXT',
        createdAt: new Date(),
    },
    totalPages: 1,
    messagePage: 1,
    listMessages: [],
    listConversation: [],
    conversation: {
        conversationId: '',
        userProfile: {
            userId: '',
            name: '',
            avatar: '',
        },
        updatedAt: '',
        lastMessage: {
            conversationId: '',
            content: '',
            senderId: '',
            type: TypeMessage.TEXT,
            createdAt: new Date(),
        },
        createdAt: '',
    },
};

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setSelectMessage: (state, action) => {
            if (!action.payload) return;
            if (action.payload.conversationId === state.conversation.conversationId) {
                const listMessage = [...state.listMessages, action.payload as IMessageApi];
                state.listMessages = listMessage;
            }
        },
        setSelectConversation: (state, action) => {
            if (!action.payload) return;
            state.conversation = { ...action.payload };
        },
        addToListConversation: (state, action) => {
            if (!action.payload) return;
            const isExist = state.listConversation.find(
                (item) => item.conversationId === action.payload.conversationId,
            );
            if (isExist) return;
            const newListConversation = [...state.listConversation, action.payload];
            state.listConversation = newListConversation;
        },
        setNewMessage: (state, action) => {
            if (!action.payload) return;
            const lastMessage: ILastMessage = action.payload;
            // find conversation
            const conversationFinded = state.listConversation.find(
                (conversation) => conversation.conversationId === lastMessage.conversationId,
            );
            // change last message
            if (conversationFinded) conversationFinded.lastMessage = lastMessage;
        },
        resetMessagePage: (state) => {
            state.messagePage = 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getListMessage.fulfilled, (state, { payload }) => {
            if (!payload) return;

            const { data } = payload;
            if (state.listMessages[0].id === data.messages.at(-1).id) return;
            state.listMessages.unshift(...data.messages.reverse());
            state.totalPages = data.totalPages;
            state.messagePage++;
        });
        builder.addCase(setInitialMessages.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            state.listMessages = data.messages.reverse();
            state.totalPages = data.totalPages;
        });
        builder.addCase(sendPhotoMessage.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            const listMessage = [...state.listMessages, data as IMessageApi];
            state.listMessages = listMessage;
        });
        builder.addCase(getConversation.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;

            state.listConversation = data;
        });
        builder.addCase(createConversation.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            const isExist = state.listConversation.find((item) => item.conversationId === data.conversationId);
            if (isExist) return;
            state.conversation = data;
            state.listConversation = [data, ...state.listConversation];
        });
    },
});

export const selectMessage = (state: RootState) => state.chat.selectMessage;
export const listMessage = (state: RootState) => state.chat.listMessages;
export const selectConversation = (state: RootState) => state.chat.conversation;
export const selectListConversation = (state: RootState) => state.chat.listConversation;
export const selectTotalPages = (state: RootState): number => state.chat.totalPages;
export const selectMessagePage = (state: RootState): number => state.chat.messagePage;
export const { setSelectMessage, setSelectConversation, addToListConversation, setNewMessage, resetMessagePage } =
    chatSlice.actions;
export default chatSlice.reducer;
