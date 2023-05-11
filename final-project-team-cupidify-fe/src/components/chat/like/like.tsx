import Image from 'next/image';
import { AiFillHeart } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import styles from './like.module.scss';

interface IProps {
    avatar: string;
    onCreateConversation: (userId: string) => void;
    onBlockUser: (id: string) => void;
    userId: string;
}

export default function LikeAvatar({ avatar, onCreateConversation, onBlockUser, userId }: IProps) {
    return (
        <div className={styles.btn}>
            <div className={`${styles.btn__container} image-container`}>
                <Image className="image" src={avatar} alt="avatar_img" layout="fill" />
            </div>
            <div className={styles.btn__content}>
                <IoClose className={styles.btn__content__icon} onClick={() => onBlockUser(userId)} />
                <AiFillHeart className={styles.btn__content__icon} onClick={() => onCreateConversation(userId)} />
            </div>
        </div>
    );
}
