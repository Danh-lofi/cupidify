import { ArrowRightIcon } from '@/components/icons';
import styles from './double-group.module.scss';

interface IProps {
    className?: string;
    title: string;
    desc: string;
    onClick?: () => void;
}
export default function DoubleGroup({ className = '', title, desc, onClick }: IProps) {
    return (
        <button onClick={onClick} className={`${className} ${styles.container}`}>
            <div className={styles.container__content}>
                <h5 className={styles.container__content__title}>{title}</h5>
                <span className={styles.container__content__sub}>{desc}</span>
            </div>
            <ArrowRightIcon className={styles.container__icon} />
        </button>
    );
}
