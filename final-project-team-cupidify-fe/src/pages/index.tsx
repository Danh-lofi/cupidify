import { useAppDispatch } from '@/app/store';
import Button from '@/components/button/button';
import { AppleIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { signInWithFacebook, signInWithGoogle } from '@/config/firebase/social-firebase-config';
import APP_PATH from '@/constant/appPath';
import { setAuthUser, setSocialLogin } from '@/reducers/authSlice';
import { toastError } from '@/utils/toast';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import styles from './home/home.module.scss';

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleClickPhone = (): void => {
        router.push(APP_PATH.AUTH_PHONE);
    };

    const handleSocialLogin = async (signInFunction: Function) => {
        try {
            const loginData = await signInFunction();
            const { name, email, socialId, checkData } = loginData;

            const isSocialExist = checkData?.checked;
            if (!isSocialExist) {
                dispatch(setAuthUser({ name, email, socialId }));
            } else {
                dispatch(setSocialLogin({ name, email, socialId, phone: checkData.data.phone }));
            }

            router.push(APP_PATH.AUTH_PHONE);
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return (
        <section className="container">
            <h1 className={`${styles.title} `}>Cupidify</h1>
            <div className={`${styles.banner} image-container`}>
                <Image className="image" src="/assets/images/banner.png" alt="banner" layout="fill" />
            </div>
            <div className={styles.body}>
                <h3 className={styles.body__title}>Đăng nhập</h3>
                <p className={styles.body__desc}>Vui lòng chọn hình thức đăng nhập để tiếp tục sử dụng</p>
            </div>
            <Button title="Đăng nhập bằng số điện thoại" type="secondary" onClick={handleClickPhone} block />
            <div className={styles.social}>
                <p className={styles.social__title}>Hoặc đăng nhập với:</p>
                <div className={styles.social__list}>
                    <button onClick={handleSocialLogin.bind('this', signInWithFacebook)}>
                        <FacebookIcon />
                    </button>
                    <button onClick={handleSocialLogin.bind('this', signInWithGoogle)}>
                        <GoogleIcon />
                    </button>
                    <button disabled>
                        <AppleIcon />
                    </button>
                </div>
            </div>
        </section>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};
Home.protected = { isToken: true };
