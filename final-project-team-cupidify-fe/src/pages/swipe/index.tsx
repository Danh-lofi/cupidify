import mapAPI from '@/api/mapApi';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { BellIcon } from '@/components/icons';
import { default as HeartLoading } from '@/components/loading/heartLoading';
import { LazyLoadingComponent } from '@/components/loading/lazy';
import SimpleLoader from '@/components/loading/simpleLoader';
import NotificationItem from '@/components/swipe/notification';
import SwipeItem from '@/components/swipe/swipeItem/swipeItem';
import UserCard from '@/components/swipe/userCard/userCard';
import Title from '@/components/title';
import { createLocation } from '@/reducers/mapAction';
import { userMatch } from '@/reducers/matchAction';
import { addMatch } from '@/reducers/matchSlice';
import { getNotification, markAllNotiRead, setInitialNotis } from '@/reducers/notificationAction';
import { pushNoti, selectNotification } from '@/reducers/notificationSlice';
import { selectRange } from '@/reducers/rangeSlice';
import { selectSocket } from '@/reducers/socketSlice';
import { getProfile, handleBlockUser } from '@/reducers/userAction';
import { toastSuccess } from '@/utils/toast';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './swipe.module.scss';

export interface IData {
    user: IProfile;
    distance: number;
}

export interface IData {
    user: IProfile;
    distance: number;
}

export interface INoti {
    createdAt: Date;
    fromAvatar: string;
    fromUserId: string;
    fromUserName: string;
    id: string;
    isSeen: boolean;
    toAvatar: string;
    toUserId: string;
    toUserName: string;
    type: string;
}

export default function Swipe() {
    const sRange = useAppSelector(selectRange);
    const { notis, totalPages, unreadNotis } = useAppSelector(selectNotification);
    const { socketNotify } = useAppSelector(selectSocket);

    const [tinder, setTinder] = useState<IData[]>([]);
    const [user, setUser] = useState<IData>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
    const [isLoadingNotis, setIsLoadingNotis] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const listenToNoti = async () => {
            try {
                const res = await dispatch(getProfile());
                const userId = res.payload.data.userId;
                socketNotify?.off(`noti-${userId}`);
                socketNotify?.on(`noti-${userId}`, (noti) => {
                    if (noti.type === 'MATCHING') {
                        dispatch(addMatch(noti));
                    }
                    dispatch(pushNoti(noti));
                });
            } catch (error) {
                console.log((error as Error).message);
            }
        };

        const getAllNotification = async () => {
            try {
                dispatch(setInitialNotis());
            } catch (error) {
                // toastError('Không có thông báo nào!');
            }
        };

        const fetchUserAround = async () => {
            try {
                setIsLoadingUsers(true);
                const res = await mapAPI.getLocation(sRange.range);
                setTinder(res.data);
                setIsLoadingUsers(false);
            } catch (error) {
                // toastError('Không có người dùng nào lân cận!');
            }
        };

        const handlePermission = async () => {
            if (global.navigator && global.navigator.geolocation) {
                global.navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const data = {
                            long: position.coords.longitude,
                            lat: position.coords.latitude,
                        };
                        const res = await dispatch(createLocation(data));
                        res.payload && fetchUserAround();
                    },
                    () => {},
                );
            } else {
                // toastError('Bạn chưa cấp quyền vị trí vì vậy không thể tìm bạn bè xung quanh');
            }
        };

        getAllNotification();
        listenToNoti();
        handlePermission();
        fetchUserAround();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketNotify]);

    const handleSeenInfo = (tinder: IData) => () => setUser(tinder);
    const handleClose = (): void => setUser(undefined);

    const handleBlock = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn chặn người này?')) {
            try {
                dispatch(handleBlockUser(id));
                setTinder([...tinder.filter((user) => user.user.userId !== id)]);
                setUser(undefined);
                toastSuccess(`Đã chặn người này! `);
            } catch (error) {
                console.log((error as Error).message);
            }
        }
    };

    const handleMatchUser = async (id: string) => {
        try {
            dispatch(userMatch(id));
            setTinder([...tinder.filter((user) => user.user.userId !== id)]);
            setUser(undefined);
            // toastSuccess('Bạn đã thích thành công');
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await dispatch(markAllNotiRead());
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    const handleLoadMoreNotis = async () => {
        try {
            setIsLoadingNotis(true);
            await dispatch(getNotification(notis.at(-1)?.id as string));
            setPage((prev) => prev + 1);
            setIsLoadingNotis(false);
        } catch (err) {
            console.log((err as Error).message);
        }
    };

    return (
        <section className={`container ${styles.swipe}`}>
            <Title
                className={styles.swipe__box}
                content={
                    <div className={styles.swipe__box__wrap}>
                        <h1>Cupidify</h1>
                        <div className={styles.swipe__box__wrap__notification}>
                            <button
                                className={styles.swipe__box__wrap__notification__bell}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <BellIcon />
                                {notis && (
                                    <span className={styles.swipe__box__wrap__notification__bell__length}>
                                        {/* {notis.filter((i) => !i.isSeen).length} */}
                                        {unreadNotis}
                                    </span>
                                )}
                            </button>

                            {isOpen && (
                                <div className={styles.swipe__box__wrap__notification__box}>
                                    <div className={styles.swipe__box__wrap__notification__box__close}>
                                        <button
                                            className={`${
                                                notis?.length
                                                    ? styles.swipe__box__wrap__notification__box__close__btnReadAll
                                                    : 'visibleHidden'
                                            }`}
                                            onClick={handleMarkAllRead}
                                        >
                                            Đọc tất cả
                                        </button>
                                        <button
                                            className={styles.swipe__box__wrap__notification__box__close__btn}
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <GrClose size={24} />
                                        </button>
                                    </div>
                                    <div className={styles.swipe__box__wrap__notification__box__content}>
                                        {notis?.length ? (
                                            notis.map((i) => <NotificationItem key={i.id} data={i} />)
                                        ) : (
                                            <div className={styles.swipe__box__wrap__notification__box__content__not}>
                                                <Image
                                                    alt="not notification"
                                                    src="/assets/images/not-notification.png"
                                                    width={500}
                                                    height={300}
                                                />
                                                <p
                                                    className={
                                                        styles.swipe__box__wrap__notification__box__content__not__title
                                                    }
                                                >
                                                    Chưa có thông báo
                                                </p>
                                            </div>
                                        )}
                                        {page < totalPages && !isLoadingNotis && (
                                            <button
                                                className={
                                                    styles.swipe__box__wrap__notification__box__content__loadMore
                                                }
                                                onClick={handleLoadMoreNotis}
                                            >
                                                Tải thêm
                                            </button>
                                        )}
                                        {isLoadingNotis && <SimpleLoader />}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
            {isLoadingUsers ? (
                <HeartLoading />
            ) : tinder.length > 0 ? (
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-130%', 0, -500],
                        },
                        next: {
                            shadow: true,
                            translate: ['130%', 0, -500],
                        },
                    }}
                    modules={[EffectCreative]}
                >
                    {tinder?.map((i) => (
                        <SwiperSlide key={i.user.userId}>
                            <LazyLoadingComponent>
                                <UserCard
                                    onSeen={handleSeenInfo}
                                    onBlock={handleBlock}
                                    onMatch={handleMatchUser}
                                    user={i.user}
                                    distance={i.distance}
                                />
                            </LazyLoadingComponent>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className={styles.swipe__box__wrap__user__not}>
                    <Image alt="no users found" src="/assets/images/cat-no-users.png" width={500} height={300} />
                    <p className={styles.swipe__box__wrap__user__not__title}>
                        Không tìm thấy người dùng nào xung quanh!
                    </p>
                </div>
            )}
            {user && <SwipeItem data={user} onClose={handleClose} onMatch={handleMatchUser} onBlock={handleBlock} />}
        </section>
    );
}

Swipe.protected = true;
