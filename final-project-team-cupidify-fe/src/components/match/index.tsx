import { useAppDispatch, useAppSelector } from '@/app/store';
import { CloseIcon, MatchTitleIcon, SendIconMatch } from '@/components/icons';
import APP_PATH from '@/constant/appPath';
import { setNewMessage } from '@/reducers/chatSlice';
import { createConversation } from '@/reducers/conversationAction';
import { closeMatch, selectMatch } from '@/reducers/matchSlice';
import { selectSocket } from '@/reducers/socketSlice';
import { selectUser } from '@/reducers/userSlice';
import { TypeMessage } from '@/types/enum';
import { toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import HeartContainer from './heartWrapper';
import styles from './match.module.scss';

export default function Matching() {
    const sMatch = useAppSelector(selectMatch).data;
    const socketChat = useAppSelector(selectSocket).socketChat;
    const sUser = useAppSelector(selectUser);

    const sendToUser = sUser.userId === sMatch?.userFromId ? sMatch?.userToId : sMatch?.userFromId;

    const [greetMessage, setGreetMessage] = useState<string>('');
    const router = useRouter();

    const dispatch = useAppDispatch();

    const createConversationHandle = async (userId: string) => {
        try {
            const response = await dispatch(createConversation(userId));
            const conversationId = response.payload.data.conversationId;

            const message: ICreateMessage = {
                conversationId,
                senderId: sUser.userId,
                receiverId: userId,
                content: greetMessage ? greetMessage : 'BUZZ',
                isSeen: false,
                type: TypeMessage.TEXT,
                createdAt: new Date(),
            };
            socketChat?.emit('send-message', message);
            dispatch(setNewMessage(message));
            dispatch(closeMatch());

            router.push(`${APP_PATH.CHAT}/${conversationId}`);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const handleSkip = async () => {
        dispatch(closeMatch());
        toastSuccess('Bỏ qua thành công');
    };

    const handleClose = async () => dispatch(closeMatch());

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createConversationHandle(sendToUser);
    };

    return (
        <section id="navbar" className={`${styles.container} animate-up`}>
            {sMatch ? (
                <div className={`${styles.container__box} matchingFrame`}>
                    <div className={styles.container__box__btn}>
                        <button className={styles.container__box__btn__button} onClick={handleClose}>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className={styles.container__content}>
                        {sMatch && <HeartContainer key={1} user={sMatch && sMatch} />}
                        <div className={styles.container__content__boxTitle}>
                            <MatchTitleIcon className={`${styles.container__content__boxTitle____icon} match-title`} />
                            <p className={styles.container__content__boxTitle__title}>
                                Đừng để người ấy phải đợi, <br />
                                gửi lời chào ngay!
                            </p>
                        </div>
                        <div className={styles.container__content__boxForm}>
                            <form onSubmit={handleSubmit} className={styles.container__content__boxForm__form}>
                                <input
                                    className={styles.container__content__boxForm__form__input}
                                    type="text"
                                    onChange={(e) => setGreetMessage(e.target.value)}
                                    value={greetMessage}
                                    placeholder="Gửi lời chào"
                                    maxLength={50}
                                    required
                                />
                                <button
                                    type="submit"
                                    className={`${styles.container__content__boxForm__form__icon} bg-white`}
                                >
                                    <SendIconMatch />
                                </button>
                            </form>
                            <button className={styles.container__content__boxForm__skipBtn} onClick={handleSkip}>
                                Skip
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </section>
    );
}
