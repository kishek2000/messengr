import React from 'react';
import { MessengrTheme } from '../context/theme-context';
import { defaultTheme } from '../styles/themes/default';
import { darkTheme } from '../styles/themes/dark';
import { NextRouter } from 'next/router';

export const useCache = (
  setMobileMode: React.Dispatch<React.SetStateAction<boolean>>,
  setTheme: React.Dispatch<React.SetStateAction<MessengrTheme>>,
  router: NextRouter,
  userDispatch: React.Dispatch<{ type: string; payload: any }>,
  state: any
) => {
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
      userDispatch({
        type: 'login',
        payload: { user: JSON.parse(lStorageUser) },
      });
      if (state.socket && (state.socket as WebSocket).readyState === 1) {
        state.socket.send(
          JSON.stringify({
            type: 'updateChats',
            data: { user: JSON.parse(lStorageUser) },
          })
        );
      }
      router.push('/chats');
    }

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.socket]);
};
