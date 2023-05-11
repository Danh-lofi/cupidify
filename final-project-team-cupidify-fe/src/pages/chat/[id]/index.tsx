import { useAppDispatch, useAppSelector } from '@/app/store';
import ListMessage from '@/components/chat/listMessage';
import Plus from '@/components/chat/plus';
import Drop from '@/components/dropdown';
import { ArrowLeft, ArrowRightIcon, HeartCircleIcon, SendIcon, SetIcon } from '@/components/icons';
import HeartLoading from '@/components/loading/heartLoading';
import { LazyLoadingImage } from '@/components/loading/lazy';
import Title from '@/components/title';
import APP_PATH from '@/constant/appPath';
import {
    listMessage,
    selectConversation,
    selectListConversation,
    setNewMessage,
    setSelectConversation,
    setSelectMessage,
} from '@/reducers/chatSlice';
import { setLoading } from '@/reducers/loadingSlice';
import { sendPhotoMessage, setInitialMessages } from '@/reducers/messageAction';
import { selectSocket } from '@/reducers/socketSlice';
import { selectUser } from '@/reducers/userSlice';
import { TypeMessage, TypeTime } from '@/types/enum';
import { formatMatchDate } from '@/utils/convert';
import { EmojiStyle } from 'emoji-picker-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import styles from './chat-id.module.scss';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface IEmoji {
    emoji: string;
}
export default function Room() {
    const refInput = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const [files, setFiles] = useState<File[]>([]);
    const [audioFile, setAudioFile] = useState<File>();
    const [isShowEmoji, setIsShowEmoji] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

    const sConversation = useAppSelector(selectConversation);
    const listConversation = useAppSelector(selectListConversation);

    console.log(listConversation);
    const listMessages = useAppSelector(listMessage);
    const sUser = useAppSelector(selectUser);
    const sSocketChat = useAppSelector(selectSocket).socketChat;

    console.log(sConversation);

    const timeMatching = formatMatchDate(sConversation.createdAt);
    const router: NextRouter = useRouter();
    const { id } = router.query;

    const handleRemoveImageUpload = (index: number) => () => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const changeLoadingButtonHandle = () => {
        setIsLoading(!isLoading);
    };

    const onEmojiClick = (event: IEmoji) => {
        if (refInput.current) {
            refInput.current.value = refInput.current?.value + event.emoji;
        }
    };

    const handleSubmit = async () => {
        if (files.length) {
            setIsLoading(true);
            setFiles([]);

            for (let image of files) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append(
                    'conversationId',
                    sConversation.conversationId ? sConversation.conversationId : (id as string),
                );
                formData.append('senderId', sUser.userId);
                formData.append('receiverId', sConversation.userProfile.userId);
                formData.append('content', '');
                formData.append('isSeen', 'false');
                formData.append('type', `${TypeMessage.IMAGE}`);
                const response = await dispatch(sendPhotoMessage(formData));

                if (response.payload) {
                    setIsLoading(false);
                }

                dispatch(setNewMessage(response.payload.data));
            }
            return;
        }
        if (!refInput.current) return;

        if (!refInput.current) return;

        const message = refInput.current?.value;
        const messageTrim = message?.trim();
        if (!messageTrim) {
            refInput.current.value = '';
            return;
        }
        const messageSended = {
            conversationId: sConversation.conversationId ? sConversation.conversationId : (id as string),
            senderId: sUser.userId,
            receiverId: sConversation.userProfile.userId,
            content: messageTrim,
            isSeen: false,
            type: TypeMessage.TEXT,
            createdAt: new Date(),
        };

        sSocketChat?.emit('send-message', messageSended);
        dispatch(setNewMessage(messageSended));
        dispatch(setSelectMessage(messageSended));
        refInput.current.value = '';
        setIsLoading(false);
        setIsShowEmoji(false);
    };

    const handleOpenEmoji = (): void => setIsShowEmoji(!isShowEmoji);

    const onBack = () => router.push(APP_PATH.CHAT);

    const classBoxChat = () => {
        let className;
        // let className = 'calc(100vh - 223px)';
        // if (files.length !== 0) {
        //     className = 'calc(100vh - 287px)';
        // }
        // if (audioFile) {
        //     className = 'calc(100vh - 271px)';
        // }
        // if (files.length !== 0 && audioFile) {
        //     className = 'calc(100vh - 335px)';
        // }
        return className;
    };

    useEffect(() => {
        const getMessages = async () => {
            setIsLoadingMessages(true);
            await dispatch(setInitialMessages(id as string));
            dispatch(setLoading(false));
            setIsLoadingMessages(false);
        };
        getMessages();
    }, []);

    useEffect(() => {
        const timeoutID = window.setTimeout(() => {
            dispatch(setLoading(false));
        }, 500);

        // Set Again Conversation
        if (!sConversation.conversationId) {
            const conversationFinded = listConversation.find(
                (conversation: IConversation) => conversation.conversationId === id,
            );
            dispatch(setSelectConversation(conversationFinded));
        }

        listMessages.length === 0 && dispatch(setLoading(true));

        return () => window.clearTimeout(timeoutID);
    }, [listConversation]);

    return (
        <section className={`${styles.room} container bg-white`}>
            <section className={styles.header}>
                <Title
                    className={styles.room__title}
                    content={
                        <div className={styles.room__title__container}>
                            <div onClick={onBack}>
                                <ArrowLeft />
                            </div>
                            <Drop userId={sConversation.userProfile.userId} />
                        </div>
                    }
                />

                <div className={styles.room__info}>
                    <div className={styles.room__info__container}>
                        <div className={`${styles.room__info__container__boxImage} image-container`}>
                            <Image
                                className="image"
                                src={
                                    sConversation.userProfile.avatar
                                        ? sConversation.userProfile.avatar
                                        : '/assets/images/avatar.png'
                                }
                                alt="avatar"
                                layout="fill"
                            />
                            <div className={styles.room__info__container__boxImage__heart}>
                                <HeartCircleIcon />
                            </div>
                        </div>
                        <div className={styles.room__info__container__name}>
                            <p className={styles.room__info__container__name__title}>
                                {sConversation.userProfile.name}
                            </p>

                            <span className={styles.room__info__container__name__status}>
                                <>
                                    {timeMatching.value === 0 || !timeMatching.value ? (
                                        <p>Vừa mới kết nối</p>
                                    ) : (
                                        <>
                                            Đã kết nối {timeMatching.value}{' '}
                                            {TypeTime[timeMatching.type as keyof typeof TypeTime]} trước
                                        </>
                                    )}
                                </>
                            </span>
                        </div>
                    </div>
                    <ArrowRightIcon />
                </div>
            </section>

            {isLoadingMessages ? (
                <HeartLoading />
            ) : (
                <ListMessage className={classBoxChat()} listMessage={listMessages} />
            )}
            <div className={styles.room__box__preview}>
                <div className={styles.room__box__preview__img}>
                    {files.map((file, index) => (
                        <div className={styles.photo__hidden}>
                            <LazyLoadingImage
                                key={index}
                                alt="img"
                                className=""
                                width={100}
                                height={100}
                                src={URL.createObjectURL(file)}
                            />
                            <button
                                className={`${styles.container__btn} absolute-center`}
                                onClick={handleRemoveImageUpload(index)}
                                disabled={isLoading}
                            >
                                <IoMdClose />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.room__chat}>
                {/* plus for more media */}
                <Plus files={files} setFiles={setFiles} setAudioFile={setAudioFile} />

                {/* input message */}
                <div className={styles.room__chat__message}>
                    <input
                        ref={refInput}
                        type="text"
                        className={styles.room__chat__message__input}
                        placeholder="Aa"
                        required={files.length === 0 && !audioFile}
                    />

                    <div className={styles.room__chat__message__setIcon}>
                        <button onClick={handleOpenEmoji}>
                            <SetIcon />
                        </button>
                        <div
                            className={`${isShowEmoji ? 'block' : 'hidden'} ${
                                styles.room__chat__message__setIcon__emoji
                            } `}
                        >
                            <Picker
                                onEmojiClick={onEmojiClick}
                                skinTonesDisabled
                                height={400}
                                emojiStyle={EmojiStyle.NATIVE}
                            />
                        </div>
                    </div>
                </div>

                <button className={styles.room__chat__send} type="submit" onClick={handleSubmit}>
                    {isLoading ? <BiLoaderAlt className="animate-spin" /> : <SendIcon />}
                </button>
            </div>
        </section>
    );
}

Room.protected = true;
Room.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};
