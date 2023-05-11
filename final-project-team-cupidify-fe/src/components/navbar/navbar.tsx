import APP_PATH from '@/constant/appPath';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { memo } from 'react';
import {
    ChatFillIcon,
    ChatIcon,
    MapFillIcon,
    MapIcon,
    PersonFillIcon,
    PersonIcon,
    SurfFillIcon,
    SurfIcon,
} from '../icons';
import styles from './index.module.scss';
import NavBarItem from './navbarItem/navbarItem';

const Portal = dynamic(() => import('@/hoc/Portal'), { ssr: false });

function Navbar() {
    const router = useRouter();
    return (
        <Portal id="navbar" className={`fixTapHighLight ${styles.container} `} section="section">
            <div className={styles.container__content}>
                <NavBarItem
                    Icon={<SurfIcon />}
                    IconActive={<SurfFillIcon />}
                    label="Lướt"
                    active={router.route === APP_PATH.SWIPE}
                    href={APP_PATH.SWIPE}
                />
                <NavBarItem
                    Icon={<MapIcon />}
                    IconActive={<MapFillIcon />}
                    label="Map"
                    active={router.route === APP_PATH.MAP}
                    href={APP_PATH.MAP}
                />
                <NavBarItem
                    Icon={<ChatIcon />}
                    IconActive={<ChatFillIcon />}
                    label="Trò chuyện"
                    active={router.route === APP_PATH.CHAT}
                    href={APP_PATH.CHAT}
                />
                <NavBarItem
                    Icon={<PersonIcon />}
                    IconActive={<PersonFillIcon />}
                    label="Cá nhân"
                    active={router.route === APP_PATH.PROFILE}
                    href={APP_PATH.PROFILE}
                />
            </div>
        </Portal>
    );
}
export default memo(Navbar);
