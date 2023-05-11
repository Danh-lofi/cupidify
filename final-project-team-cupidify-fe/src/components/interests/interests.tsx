import { bgColor } from '@/utils/color';
import styles from './interests.module.scss';

interface IProps {
    title: string;
}

export default function Interests({ title }: IProps) {
    const index = title.length ? (title.length - 1) % bgColor.length : 0;
    const color = bgColor[index];

    return (
        <div
            style={{
                backgroundColor: color,
            }}
            className={styles.container}
        >
            <span className={styles.container__title}>#{title}</span>
        </div>
    );
}
