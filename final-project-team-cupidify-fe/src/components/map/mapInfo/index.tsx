import { InformationIcon, LocationIcon } from '@/components/icons';
import { handleAge } from '@/utils/handleAge';
import Image from 'next/image';
import styles from './map-info.module.scss';

interface IProps {
    data: IMapUserResponse;
    onClick: () => void;
}

export default function MapUserInfo({ data, onClick }: IProps) {
    return (
        <div className={styles.container}>
            <div className={`${styles.container__boxImg} image-container`}>
                <Image
                    src={data.user.avatar || '/assets/images/avatar.png'}
                    className={`image ${styles.container__boxImg__img}}`}
                    alt="avatar"
                    layout="fill"
                />
            </div>
            <div className={styles.container__boxInfo}>
                <div className={styles.container__boxInfo__content}>
                    <h3 className={styles.container__boxInfo__content__title}>{data.user.name}</h3>
                    <h3>,</h3>
                    <h3 className={styles.container__boxInfo__content__age}>{handleAge(data.user.birthday)}t</h3>
                </div>
                <div className={styles.container__boxInfo__boxLocation}>
                    <LocationIcon />
                    <span className={styles.container__boxInfo__boxLocation__title}>Cách {data.distance}m</span>
                </div>
            </div>
            <button className={styles.container__boxBtn} onClick={onClick}>
                <InformationIcon fill="#F4F5F5" />
            </button>
        </div>
    );
}
