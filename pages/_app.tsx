import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { store } from '../app/store';
import { getNote } from '../features/note';
import { LocaleType, setInitialTheme, ThemeType } from '../features/theme';
import '../styles/globals.css';
import { getAccessToken } from '../utils/lib/cache';
import 'react-toastify/dist/ReactToastify.css';

const window = undefined;

function InitialWrapper({ children } : { children:ReactElement }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const theme = localStorage.getItem('theme') as ThemeType | null || ThemeType.LIGHT;
    const locale = localStorage.getItem('locale') as LocaleType | null || LocaleType.EN;
    dispatch(setInitialTheme({ theme, locale }));

    if (!getAccessToken()) router.replace('/auth/login');
    else if (router.asPath === '/auth/login' || router.asPath === '/auth/register') {
      dispatch(getNote()).then((response) => {
        if (response.payload.error) {
          if (locale === 'en') toast.error('Error fetching notes');
          else toast.error('Gagal mengunduh catatan');
        }

        router.replace('/');
      });
    } else dispatch(getNote());
  }, [window, user]);

  return children;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitialWrapper>
        <>
          <Head>
            <title>Noteku</title>
          </Head>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      </InitialWrapper>
    </Provider>
  );
}

export default MyApp;
