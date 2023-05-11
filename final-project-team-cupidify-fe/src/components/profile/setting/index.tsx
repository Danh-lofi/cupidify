import { SettingIcon } from '@/components/icons';
import APP_PATH from '@/constant/appPath';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useRouter } from 'next/router';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useAppDispatch } from '../../../app/store';
import { setLogin } from '../../../reducers/authSlice';
import styles from './setting.module.scss';

export default function Setting() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const handleLogout = (): void => {
        localStorage.removeItem('token');
        router.push(APP_PATH.ROOT);
        dispatch(setLogin(false));
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={handleLogout} className={styles.btn__container}>
                    <RiLogoutCircleRLine className={styles.btn__container__icon} />
                    <p>Đăng xuất</p>
                </button>
            ),
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
            <button className={styles.btn__setting}>
                <SettingIcon />
            </button>
        </Dropdown>
    );
}
