import { useAppSelector } from '@/app/store';
import { LazyLoadingImage } from '@/components/loading/lazy';
import { selectUser } from '@/reducers/userSlice';
import { useState } from 'react';
import { FaCrown, FaHeart, FaTrash } from 'react-icons/fa';
import styles from './album-img.module.scss';

type IProps = {
    url: string;
    isFavorite: boolean;
    onFavorite: () => void;
    onAvatar: () => void;
    onDelete: () => void;
};

export default function AlbumsImage({ url, isFavorite, onAvatar, onDelete, onFavorite }: IProps) {
    const [isShowLayout, setIsShowLayout] = useState<boolean>(false);
    const avatarUrl = useAppSelector(selectUser).avatar;
    const isAvatar = avatarUrl === url;

    const handleShowLayout = () => setIsShowLayout(!isShowLayout);

    return (
        <div onClick={handleShowLayout} className={styles.container}>
            {isFavorite && (
                <div className={styles.container__isFavorite}>
                    <FaHeart fill="#FF5206" />
                </div>
            )}

            {isAvatar && (
                <div className={styles.container__isDefault}>
                    <FaCrown fill="#ffd800" />
                </div>
            )}

            {isShowLayout && (
                <div className={styles.container__isShowLayout}>
                    {!isAvatar && (
                        <button>
                            <FaCrown size={24} fill="#fff" onClick={onAvatar} />
                        </button>
                    )}
                    {isFavorite ? (
                        <button>
                            <FaHeart size={24} fill="#FF5206" onClick={onFavorite} />
                        </button>
                    ) : (
                        <button>
                            <FaHeart size={24} fill="#fff" onClick={onFavorite} />
                        </button>
                    )}
                    <button>
                        <FaTrash size={24} fill="#fff" onClick={onDelete} />
                    </button>
                </div>
            )}

            <div className={`${styles.container__content} image-container`}>
                <LazyLoadingImage
                    key=""
                    src={url}
                    alt="post_image"
                    className="image object-cover"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}
