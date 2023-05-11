import { LazyLoadingImage } from '@/components/loading/lazy';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styles from './album-item.module.scss';

interface IProps {
    firstImage?: boolean;
    anotherImages?: number;
    middleImage?: boolean;
    upLoad?: boolean;
    url: string;
    onClick?: () => void;
}

export default function AlbumsItem({ firstImage, anotherImages, middleImage, upLoad, url, onClick }: IProps) {
    const [isShow, setIsShow] = useState(false);

    let classCSS = `${styles.classCSS}`;
    if (firstImage) {
        classCSS = `${styles.addClassCSS} ${styles.classCSS}`;
    }

    const handleClick = (): void => setIsShow(!isShow);

    const lazyLoadingImageComponents = (
        <LazyLoadingImage key="" src={url} alt="post_image" className="image object-cover" width="100%" height="100%" />
    );

    return (
        <>
            {upLoad ? (
                <div className={styles.container} onClick={handleClick}>
                    {isShow && (
                        <div className={styles.container__show}>
                            <button onClick={onClick}>
                                <FaTrash size={24} fill="#fff" />
                            </button>
                        </div>
                    )}
                    <div className={`${styles.container__boxImg} image-container`}>{lazyLoadingImageComponents}</div>
                </div>
            ) : firstImage || middleImage ? (
                <div className={classCSS} onClick={onClick}>
                    <div className="h-full image-container">{lazyLoadingImageComponents}</div>
                </div>
            ) : anotherImages ? (
                <div className={styles.container} onClick={onClick}>
                    <div className={styles.container__anotherImg}>
                        <span>+{anotherImages}</span>
                    </div>
                    {lazyLoadingImageComponents}
                </div>
            ) : (
                <div className={styles.container} onClick={onClick}>
                    {lazyLoadingImageComponents}
                </div>
            )}
        </>
    );
}
