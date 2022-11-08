import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { store } from '../app/store';
import { getNote } from '../features/note';
import { LocaleType, setInitialTheme, ThemeType } from '../features/theme';
import '../styles/globals.css';
import { getAccessToken } from '../utils/lib/cache';

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
      router.replace('/');
      getNote();
    } else dispatch(getNote());
  }, [window, user]);

  return children;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <InitialWrapper>
        <Component {...pageProps} />
      </InitialWrapper>
    </Provider>
  );
}

export default MyApp;
