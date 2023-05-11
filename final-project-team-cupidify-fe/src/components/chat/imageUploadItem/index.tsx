import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import styles from './image-upload-item.module.scss';

interface IProps {
    src: string;
    index: number;
    onRemove: (index: number) => () => void;
}

export default function ImageUploadItem({ index, src, onRemove }: IProps) {
    return (
        <div className={styles.container}>
            <div className={`${styles.container__content} image-container`}>
                <Image className="image" src={src} alt="demo_img" fill />
            </div>
            <button className={`${styles.container__btn} absolute-center`} onClick={onRemove(index)}>
                <IoMdClose />
            </button>
        </div>
    );
}
