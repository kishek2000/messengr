/** @jsxImportSource @emotion/react */

import 'normalize.css';
import React, { Fragment } from 'react';
import type { AppProps } from 'next/app';
import { ThemeContext } from '../context/theme-context';
import { darkTheme } from '../styles/themes/dark';

import { ThemeSelection } from '../components/common/theme-toggle';
import { initialUser, UserContext, userDispatcher } from '../context/user-context';
import { useRouter } from 'next/router';
import {
  ChatContext,
  chatStateDispatcher,
  initialChatContextState,
} from '../context/chats-context';
import { useCache } from '../hooks/use-cache';
import { useSocket } from '../hooks/use-socket';

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState(darkTheme);
  const [mobileMode, setMobileMode] = React.useState(false);
  const [user, userDispatch] = React.useReducer(userDispatcher, initialUser.user);
  const [state, stateDispatch] = React.useReducer(
    chatStateDispatcher,
    initialChatContextState.state
  );

  const [sessionId, setSessionId] = React.useState('');
  const router = useRouter();

  useCache(setMobileMode, setTheme, router, userDispatch, state);
  useSocket(sessionId, stateDispatch);

  return (
    <ChatContext.Provider value={{ state, stateDispatch }}>
      <UserContext.Provider value={{ user, userDispatch }}>
        <ThemeContext.Provider value={theme}>
          {mobileMode ? (
            <div>Go to Deskop Version</div>
          ) : (
            <Fragment>
              <Component {...pageProps} />
              <ThemeSelection setTheme={setTheme} />
            </Fragment>
          )}
        </ThemeContext.Provider>
      </UserContext.Provider>
    </ChatContext.Provider>
  );
}

export default MyApp;
