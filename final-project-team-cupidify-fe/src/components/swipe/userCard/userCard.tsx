import CircleButton from '@/components/button/circleButton';
import CloseIcon from '@/components/icons/closeIcon';
import HeartFillIcon from '@/components/icons/heartFillIcon';
import InformationIcon from '@/components/icons/informationIcon';
import LocationIcon from '@/components/icons/locaionIcon';
import { IData } from '@/pages/swipe';
import { handleAge } from '@/utils/handleAge';
import Image from 'next/image';
import { BiLoaderAlt } from 'react-icons/bi';
import styles from './user-card.module.scss';

interface IProps {
    user: IProfile;
    onSeen: (user: IData) => () => void;
    onMatch: (id: string) => void;
    onBlock: (id: string) => void;
    distance: number;
}

export default function UserCard({ user, onBlock, onMatch, onSeen, distance }: IProps) {
    if (!user) return null;
    const newHeight = window.innerHeight - 110 - 66;
    return (
        <div
            style={{
                height: newHeight,
            }}
            className={`${styles.container}`}
        >
            <div className={`${styles.container__image} image-container`}>
                <Image
                    objectPosition="center"
                    className="image"
                    alt="avatar"
                    fill
                    src={user.avatar ? user.avatar : '/assets/images/avatar.png'}
                />
            </div>
            <div className={styles.container__content}>
                <div className={styles.container__content__box}>
                    <div className={styles.container__content__box__name}>
                        <h3 className={styles.container__content__box__name__title}>{user.name}</h3>
                        <h3>,</h3>
                        <h3 className={styles.container__content__box__name__age}>{handleAge(user.birthday)}t</h3>
                    </div>

                    <button onClick={onSeen({ user, distance })}>
                        <InformationIcon />
                    </button>
                </div>

                <div className={styles.container__content__location}>
                    <LocationIcon />
                    <span>Cách {distance}m</span>
                </div>

                <div className={styles.container__content__boxButton}>
                    <CircleButton
                        iconLoading={<BiLoaderAlt className="animate-spin" />}
                        icon={<CloseIcon />}
                        onClick={() => {
                            onBlock(user.userId);
                        }}
                    />
                    <CircleButton
                        iconLoading={<BiLoaderAlt className="animate-spin" />}
                        icon={<HeartFillIcon />}
                        onClick={() => {
                            onMatch(user.userId);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
