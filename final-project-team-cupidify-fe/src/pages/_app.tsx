import { store } from '@/app/store';
import FakePage from '@/components/fakePage';
import Loading from '@/components/loading';
import ProtectRoute from '@/components/routes/protectRoute';
import ScreenRoute from '@/components/routes/screenRoute';
import Layout from '@/layouts/publicLayout';
import '@/styles/globals.scss';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
    protected?: {
        isToken?: boolean;
    };
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        window.setTimeout(() => {
            setLoading(false);
        }, 2000);
        setLoading(true);
    }, []);

    return (
        <div>
            <Head>
                <title>Cupidify</title>
                {/* if user-scalable = no, not working maybe u should change to = 0 */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <meta name="description" content="A social network to connect with your friends" />
                <meta name="keywords" content="Cupidify, social network, friends, connect, social, network" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Provider store={store}>
                {!loading ? (
                    <ScreenRoute>
                        <FakePage />
                        {Component.protected ? (
                            <ProtectRoute isToken={Component.protected.isToken}>
                                {getLayout(<Component {...pageProps} />)}
                            </ProtectRoute>
                        ) : (
                            <>{getLayout(<Component {...pageProps} />)}</>
                        )}
                    </ScreenRoute>
                ) : (
                    <Loading />
                )}
                <Toaster
                    position="top-center"
                    reverseOrder={true}
                    toastOptions={{
                        style: {
                            zIndex: 100,
                        },
                    }}
                />
            </Provider>
        </div>
    );
}
