import { useAppDispatch, useAppSelector } from '@/app/store';
import { LazyLoadingImage } from '@/components/loading/lazy';
import { markReadNoti } from '@/reducers/notificationAction';
import { selectUser } from '@/reducers/userSlice';
import { convertSubNotification } from '@/utils/convert';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import vi from 'timeago.js/lib/lang/vi';
import styles from './notification.module.scss';

timeago.register('vi', vi);
interface IProps {
    data: IUserNoti;
}

export default function NotificationItem({ data }: IProps) {
    const sUser = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const renderUser =
        sUser.userId === data.userFromId
            ? { name: data.toUserName, avatar: data.toAvatar }
            : { name: data.fromUserName, avatar: data.fromAvatar };

    const handleClick = () => dispatch(markReadNoti({ notiId: data.id }));

    return (
        <div className={`${styles.container} ${!data.isSeen ? styles.notSeen : styles.seen}`} onClick={handleClick}>
            <div className={`${styles.container__content} ${!data.isSeen && styles.textWhite}`}>
                <div className={styles.container__content__boxImg}>
                    <LazyLoadingImage
                        key=""
                        className={`${styles.container__content__boxImg__img} ${data.type === 'LIKED' && styles.blur5}`}
                        alt={renderUser.name}
                        src={renderUser.avatar ? renderUser.avatar : '/assets/images/avatar.png'}
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.container__content__body}>
                    <p className={styles.container__content__body__title}>
                        <span className={styles.container__content__body__title__name}>
                            {data.type !== 'LIKED' && renderUser.name} {''}
                        </span>
                        <span>{convertSubNotification(data.type)}</span>
                    </p>
                    <span className={styles.container__content__body__timeAgo}>
                        <TimeAgo datetime={data.createdAt} locale="vi" />
                    </span>
                </div>
            </div>
        </div>
    );
}
