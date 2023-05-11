import { toastSuccess } from '@/utils/toast';
import { useRouter } from 'next/router';
import styles from './navbar-item.module.scss';

interface IProps {
    Icon: JSX.Element;
    label: string;
    active?: boolean;
    IconActive: JSX.Element;
    href?: string;
}

export default function NavBarItem({ Icon, label, IconActive, active, href }: IProps) {
    const router = useRouter();
    const handleClick = () => {
        if (href) router.push(href);
        else toastSuccess('Chức năng đang được phát triển');
    };
    return (
        <button className={styles.container} onClick={handleClick}>
            {active ? IconActive : Icon}
            <p className={`${styles.container__title} ${active ? 'active' : 'disabled'}`}>{label}</p>
        </button>
    );
}
