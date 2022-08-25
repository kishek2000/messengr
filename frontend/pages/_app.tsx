/** @jsxImportSource @emotion/react */

import 'normalize.css';
import React, { Fragment } from 'react';
import type { AppProps } from 'next/app';
import { MessengrTheme, ThemeContext } from '../context/theme-context';
import { defaultTheme } from '../styles/themes/default';
import { darkTheme } from '../styles/themes/dark';

import { ThemeSelection } from '../components/common/theme-toggle';
import {
  initialUser,
  UserContext,
  userDispatcher,
} from '../context/user-context';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(darkTheme);
  const [mobileMode, setMobileMode] = React.useState(false);
  const [user, userDispatch] = React.useReducer(
    userDispatcher,
    initialUser.user
  );

  const router = useRouter();

  React.useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth <= 1028) {
        setMobileMode(true);
      } else {
        setMobileMode(false);
      }
    };

    window.addEventListener('resize', resizeListener);

    const cachedTheme = localStorage.getItem('theme');
    let themeChosen: MessengrTheme;

    switch (cachedTheme) {
      case 'darkTheme':
        themeChosen = darkTheme;
        break;
      default:
        themeChosen = defaultTheme;
        break;
    }
    setTheme(themeChosen);
    localStorage.setItem('theme', themeChosen.toString());

    const lStorageUser = localStorage.getItem('user');
    if (lStorageUser === null) {
      router.push('/');
    } else {
      userDispatch({ type: 'login', payload: JSON.parse(lStorageUser) });
      router.push('/chats');
    }

    return () => window.removeEventListener('resize', resizeListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <ThemeContext.Provider value={theme}>
        {mobileMode ? (
          <div>ayo go on desktop</div>
        ) : (
          <Fragment>
            <Component {...pageProps} />
            <ThemeSelection setTheme={setTheme} />
          </Fragment>
        )}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
