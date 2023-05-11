import { useAppSelector } from '@/app/store';
import { selectUser } from '@/reducers/userSlice';
import { TypeMessage } from '@/types/enum';
import { formatAMPM } from '@/utils/convert';
import Image from 'next/image';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import styles from './convensation.module.scss';
timeago.register('vi', vi);

interface IProps {
    name: string;
    avatar: string;
    onClick?: () => void;
    lastMessage: ILastMessage;
}

export default function Conversation({ name, avatar, onClick, lastMessage }: IProps) {
    if (!lastMessage) return null;
    const user = useAppSelector(selectUser);
    const { content, senderId, type } = lastMessage;
    const date = new Date(lastMessage.createdAt);
    const time = formatAMPM(date);
    const isMe = senderId === user.userId;

    return (
        <li className={styles.container} onClick={onClick}>
            <div className={styles.container__box}>
                <div className={`${styles.container__box__avatar} image-container`}>
                    <Image className="image" src={avatar} alt="avatar_img" layout="fill" />
                </div>
                <div className={styles.container__box__content}>
                    <p className={styles.container__box__content__title}>{name}</p>
                    {lastMessage && (
                        <span className={styles.container__box__content__message}>
                            {isMe ? 'Bạn: ' : ''}
                            {type === TypeMessage.IMAGE ? 'Hình ảnh' : content}
                        </span>
                    )}
                </div>
            </div>
            {lastMessage && <div className={styles.container__timeAgo}>{time}</div>}
        </li>
    );
}
