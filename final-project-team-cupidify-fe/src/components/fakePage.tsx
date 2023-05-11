import { useAppDispatch, useAppSelector } from '@/app/store';
import { addToListConversation, selectListConversation, setNewMessage, setSelectMessage } from '@/reducers/chatSlice';
import { updateLocation } from '@/reducers/mapSlice';
import { selectSocket, setSocketChat, setSocketNotify } from '@/reducers/socketSlice';
import { toastError } from '@/utils/toast';
import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { selectAuth, setLogin } from '../reducers/authSlice';
import { getConversation } from '../reducers/conversationAction';
import { updateListMatch } from '../reducers/matchSlice';
import { getProfile } from '../reducers/userAction';
import { useRouter } from 'next/router';
import APP_PATH from '../constant/appPath';

function FakePage() {
    const isSendRequest = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const sSocketChat = useAppSelector(selectSocket).socketChat;
    const sSocketNotify = useAppSelector(selectSocket).socketNotify;
    const isLogin = useAppSelector(selectAuth).isLogin;

    const listConversation = useAppSelector(selectListConversation);
    const token = localStorage?.getItem('token');
    useEffect(() => {
        !token && isLogin && router.push(APP_PATH.ROOT);

        function getCurrentUser() {
            if (token) {
                dispatch(getProfile());
                isSendRequest.current = true;
            }
        }
        !isSendRequest.current && getCurrentUser();
        token && dispatch(setLogin(true));

        if (isLogin) {
            if (token) {
                if (!sSocketChat) {
                    const socket = io(process.env.API_PUBLIC as string, {
                        path: '/chat',
                        query: {
                            token: token,
                        },
                        transportOptions: {
                            polling: {
                                extraHeaders: {
                                    Authorization: `Bearer ${token}`,
                                },
                            },
                        },
                    });
                    dispatch(setSocketChat(socket));
                }
                // Set socket notifcation
                if (!sSocketNotify) {
                    const token = localStorage?.getItem('token');
                    const socket = io(process.env.API_PUBLIC as string, {
                        transportOptions: {
                            polling: {
                                extraHeaders: {
                                    Authorization: `Bearer ${token}`,
                                },
                            },
                        },
                    });
                    dispatch(setSocketNotify(socket));
                }
            }

            // receive-message
            if (sSocketChat) {
                // Receive Socket message
                sSocketChat.on('receive-message', (message: IMessageApi) => {
                    dispatch(setSelectMessage(message));
                    dispatch(setNewMessage(message));
                });

                // Receive socket conversation
                sSocketChat.on('create-conversation', (conversation: IConversation) => {
                    console.log("conversation: ",conversation);
                    
                    dispatch(addToListConversation(conversation));
                    dispatch(updateListMatch(conversation.userProfile.userId));
                });
            }

            // Set List Coversation
            if (listConversation.length === 0) {
                dispatch(getConversation());
            }

            const handlePermission = async () => {
                if (global.navigator && global.navigator.geolocation) {
                    global.navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const data = {
                                long: position.coords.longitude,
                                lat: position.coords.latitude,
                            };

                            dispatch(updateLocation(data));
                        },
                        () => {},
                    );
                } else {
                    console.log('Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh');
                }
            };
            handlePermission();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sSocketChat, sSocketNotify, isLogin, token]);
    return <div></div>;
}
export default React.memo(FakePage);
