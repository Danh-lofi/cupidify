import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';
import { getUserMatch, handleBlockMatchUser } from './matchAction';

declare enum MatchType {
    LIKED = 'LIKED',
    MATCHING = 'MATCHING',
    MESSAGE = 'MESSAGE',
}

interface matchState {
    isShow: boolean;
    data: IUserMatch;
    listMyMatch: IMatched[];
}

const initialState: matchState = {
    isShow: false,
    data: {
        id: '',
        isSeen: false,
        fromAvatar: '',
        fromUserName: '',
        userFromId: '',
        toUserName: '',
        userToId: '',
        toAvatar: '',
        type: MatchType.LIKED,
        createdAt: '',
    },
    listMyMatch: [],
};

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        clearMatch: () => {
            return initialState;
        },
        addMatch: (state, { payload }) => {
            state.data = payload;
            state.isShow = true;
        },
        closeMatch: (state) => {
            state.isShow = false;
        },
        updateListMatch: (state, { payload }) => {
            if (!payload) return;
            state.listMyMatch = state.listMyMatch.filter((item) => item.userId !== payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserMatch.fulfilled, (state, { payload }) => {
            if (!payload) return;
            const { data } = payload;
            state.listMyMatch = data;
        });
        builder.addCase(handleBlockMatchUser.fulfilled, (state, { payload }) => {
            const blockedId = payload;
            const newList = state.listMyMatch.filter((item) => item.userId !== blockedId);
            state.listMyMatch = newList;
        });
    },
});

export const { clearMatch, addMatch, closeMatch, updateListMatch } = matchSlice.actions;

export const selectMatch = (state: RootState) => state.match;

export default matchSlice.reducer;
