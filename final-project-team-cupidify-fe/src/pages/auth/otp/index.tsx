import authAPI from '@/api/authApi';
import { useAppDispatch, useAppSelector } from '@/app/store';
import Button from '@/components/button/button';
import { ArrowLeftIcon, ArrowRightCircleIcon, KeyIcon } from '@/components/icons';
import Title from '@/components/title';
import { authentication } from '@/config/firebase/social-firebase-config';
import APP_PATH from '@/constant/appPath';
import { selectAuth, setLogin } from '@/reducers/authSlice';
import { otpToday } from '@/utils/date';
import { toastError, toastSuccess } from '@/utils/toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux';
import styles from './otp.module.scss';

export default function OtpVerify() {
    const router = useRouter();
    const [otp, setOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const authState = useSelector(selectAuth);
    const sUserPhone = useAppSelector(selectAuth).infoUser.phone;

    const isLogin = authState.type === 'login' || authState.type === 'social_login' ? true : false;
    const dispatch = useAppDispatch();

    const changeLoadingHandle = () => {
        setIsLoading(!isLoading);
    };
    const handleChangeOtp = (value: string): void => setOtp(value);
    function saveToken(token: string) {
        localStorage.setItem('token', token);
        toastSuccess('Đăng nhập thành công');
        router.push(APP_PATH.SWIPE);
        dispatch(setLogin(true));
    }

    const loginHandle = async (phone: string, tokenOtp: string) => {
        try {
            const response = await authAPI.login(phone, tokenOtp);
            response.data.token && saveToken(response.data.token);
        } catch (error) {
            toastError('OTP hết hạn'!);
        }
    };

    const handleSubmit = async () => {
        changeLoadingHandle();
        try {
            if (otp === otpToday) {
                if (!isLogin) {
                    router.push(APP_PATH.AUTH_UPDATE);
                    return;
                }
                const response = await authAPI.loginNotOtp(sUserPhone);
                response.data.token && saveToken(response.data.token);
                changeLoadingHandle();
                return;
            }
            const confirmationResult = window.confirmationResult;
            const result = await confirmationResult.confirm(otp);

            const phone = result.user.phoneNumber.replace('+84', '0');
            if (!isLogin) {
                router.push(APP_PATH.AUTH_UPDATE);
                return;
            }
            changeLoadingHandle();

            loginHandle(phone, result._tokenResponse.idToken);
        } catch (error) {
            setIsLoading(false);
            toastError('OTP không đúng');
        }
    };

    const resendOtpHandle = (): Promise<void> => confirmResultHandle();

    const handleClickBack = (): void => {
        router.push(APP_PATH.AUTH_PHONE);
    };

    const generateRecapcha = (): void => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'recaptcha-container',
            {
                size: 'invisible',
                callback: (response: any) => {},
            },
            authentication,
        );
    };

    const confirmResultHandle = async (): Promise<void> => {
        generateRecapcha();
        const appVerifier: RecaptchaVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(
                authentication,
                `+84${authState.infoUser.phone}`,
                appVerifier,
            );
            window.confirmationResult = confirmationResult;
        } catch (error) {
            console.log((error as Error).message);
        }
    };

    return (
        <section className="container bg-white">
            <div className={styles.content}>
                <Title
                    className={styles.content__arrow}
                    content={
                        <button onClick={handleClickBack} className={styles.content__btn}>
                            <ArrowLeftIcon />
                        </button>
                    }
                />
                <div className={styles.content__body}>
                    <div className={`${styles.content__body__key} image-container`}>
                        <KeyIcon />
                    </div>
                    <div className={styles.content__body__wrap}>
                        <h4>Mã xác thực</h4>
                        <p>
                            Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành{' '}
                            {isLogin ? 'đăng nhập' : 'đăng kí'} .
                        </p>
                        <div className={styles.content__body__wrap__inputOTP}>
                            <OtpInput value={otp} onChange={handleChangeOtp} numInputs={6} isInputNum={true} />
                        </div>
                    </div>
                    <button onClick={resendOtpHandle} className={styles.content__body__resend}>
                        Gửi lại OTP
                    </button>
                </div>
                <Button
                    className={styles.content__verify}
                    title="Tiếp tục"
                    icon={<ArrowRightCircleIcon />}
                    block
                    onClick={handleSubmit}
                    disabled={isLoading}
                    loading={isLoading}
                />
            </div>
            <div id="recaptcha-container"></div>
        </section>
    );
}

OtpVerify.getLayout = function getLayout(page: ReactElement) {
    return <>{page}</>;
};

OtpVerify.protected = { isToken: true };
