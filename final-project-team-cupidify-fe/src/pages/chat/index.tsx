import { useAppDispatch, useAppSelector } from '@/app/store';
import Button from '@/components/button/button';
import Conversation from '@/components/chat/convensation';
import Like from '@/components/chat/like/like';
import Title from '@/components/title';
import APP_PATH from '@/constant/appPath';
import { selectListConversation, setNewMessage, setSelectConversation } from '@/reducers/chatSlice';
import { createConversation, getConversation } from '@/reducers/conversationAction';
import { selectLoading, setLoading } from '@/reducers/loadingSlice';
import { getUserMatch, handleBlockMatchUser } from '@/reducers/matchAction';
import { selectMatch } from '@/reducers/matchSlice';
import { selectSocket } from '@/reducers/socketSlice';
import { selectUser } from '@/reducers/userSlice';
import { TypeMessage } from '@/types/enum';
import { toastSuccess } from '@/utils/toast';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import HeartLoading from '../../components/loading/heartLoading';
import styles from './chat.module.scss';

export default function Chat() {
    const router = useRouter();
    const sMatch = useAppSelector(selectMatch).listMyMatch;
    const sListConversation = useAppSelector(selectListConversation);
    const [isConversation, setIsConversation] = useState(false);
    const isLoading = useAppSelector(selectLoading);

    const sUser = useAppSelector(selectUser);
    const socketChat = useAppSelector(selectSocket).socketChat;

    const dispatch = useAppDispatch();

    useEffect(() => {
        const getListConversation = async () => {
            if (sListConversation.length === 0) {
                const res = await dispatch(getConversation());
                if (res.payload.message === 'no conversation') {
                    setIsConversation(true);
                }
                dispatch(setLoading(true));
            } else {
                dispatch(setLoading(false));
            }
        };

        // Check data real with database
        if (!isConversation) getListConversation();
        dispatch(getUserMatch());

        const timeoutID = window.setTimeout(() => {
            dispatch(setLoading(false));
        }, 1000);

        return () => window.clearTimeout(timeoutID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle Start
    const startConversationHandle = (conversation: IConversation) => (): void => {
        dispatch(setLoading(true));
        dispatch(setSelectConversation(conversation));
        router.push(`${APP_PATH.CHAT}/${conversation.conversationId}`);
    };

    // Handle Create conversation
    const createConversationHandle = async (userId: string) => {
        dispatch(setLoading(true));

        try {
            const response = await dispatch(createConversation(userId));
            const conversationId = response.payload.data.conversationId;

            const message: ICreateMessage = {
                conversationId,
                senderId: sUser.userId,
                receiverId: userId,
                content: 'BUZZ',
                isSeen: false,
                type: TypeMessage.TEXT,
                createdAt: new Date(),
            };
            socketChat?.emit('send-message', message);
            dispatch(setNewMessage(message));

            router.push(`${APP_PATH.CHAT}/${conversationId}`);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const blockUserHandle = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn chặn người này?')) {
            try {
                dispatch(handleBlockMatchUser(id));
                toastSuccess(`Đã chặn người này! `);
            } catch (error) {
                console.log((error as Error).message);
            }
        }
    };

    return (
        <section className={`${styles.chat} container bg-white`}>
            <Title
                className={styles.chat__box}
                content={
                    <div className={styles.chat__box__wrap}>
                        <h2 className={styles.chat__box__wrap__title}>Trò chuyện</h2>
                    </div>
                }
            />
            {isLoading ? (
                <HeartLoading />
            ) : !sMatch.length && !sListConversation.length ? (
                <div className={styles.chat__boxFriend__noFriend}>
                    <div className={styles.chat__boxFriend__noFriend__content}>
                        <Image src="/assets/images/no-friends.svg" width={200} height={200} alt="no-friend" />
                        <p className={styles.chat__boxFriend__noFriend__content__title}>Chưa có bạn bè nào</p>
                    </div>
                    <Button title="Tìm bạn ngay" onClick={() => router.push(APP_PATH.SWIPE)} />
                </div>
            ) : (
                <div className={styles.chat__boxFriend}>
                    <>
                        {sMatch.length ? (
                            <>
                                <p className={styles.chat__boxFriend__title}>Danh sách bạn bè</p>
                                <Swiper spaceBetween={16} slidesPerView={3.5}>
                                    {sMatch.map((i: IMatched) => (
                                        <SwiperSlide key={i.userId} className="p-1">
                                            <Like
                                                avatar={i.avatar ? i.avatar : '/assets/images/avatar.png'}
                                                onCreateConversation={createConversationHandle}
                                                onBlockUser={blockUserHandle}
                                                userId={i.userId}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </>
                        ) : (
                            ''
                        )}

                        <h5 className={`${styles.chat__boxFriend__conversation__title} ${sMatch.length && 'mt-4'}`}>
                            Trò chuyện
                        </h5>
                        {sListConversation.length ? (
                            <ul className={styles.chat__boxFriend__conversation__box}>
                                {sListConversation.map((item: IConversation) => (
                                    <>
                                        {item.userProfile && (
                                            <Conversation
                                                name={item.userProfile.name ? item.userProfile.name : 'Danh'}
                                                avatar={
                                                    item.userProfile.avatar
                                                        ? item.userProfile.avatar
                                                        : '/assets/images/avatar.png'
                                                }
                                                key={item.conversationId}
                                                onClick={startConversationHandle(item)}
                                                lastMessage={item.lastMessage}
                                            />
                                        )}
                                    </>
                                ))}
                            </ul>
                        ) : (
                            <div className={styles.chat__boxFriend__conversation__notChat}>
                                <Image
                                    src="/assets/images/not-chat.png"
                                    width={230}
                                    height={230}
                                    alt="no-conversation"
                                />
                                <p className={styles.chat__boxFriend__conversation__notChat__title}>
                                    Chat với người ấy ngay đi nào!
                                </p>
                            </div>
                        )}
                    </>
                </div>
            )}
        </section>
    );
}

Chat.protected = true;
