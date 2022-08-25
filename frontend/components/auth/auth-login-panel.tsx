/** @jsxImportSource @emotion/react */

import { mq } from '../../styles/mq';
import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { AuthPanelInput } from './auth-panel-input';
import { AuthPanelButton } from './auth-panel-button';
import { useRouter } from 'next/router';
import { mockUserA } from './__mocks__/mock-user-a';
import { mockUserB } from './__mocks__/mock-user-b';
import { UserContext } from '../../context/user-context';
import { User } from '../../model/types';
import { mockChatA } from '../chat/__mocks__/mock-chat-a';

export const AuthLoginPanel = () => {
  const theme = React.useContext(ThemeContext);
  const { userDispatch } = React.useContext(UserContext);
  const router = useRouter();

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });

  const handleFormChange = React.useCallback(
    (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginForm((form) => ({ ...form, [name]: e.target.value }));
    },
    []
  );

  const onSignUp = () => {
    router.push('/signup');
  };

  const onLogin = () => {
    const usernameCorrect =
      loginForm.username === mockUserA.username ||
      loginForm.username === mockUserB.username;
    const passwordCorrect =
      loginForm.password === mockUserA.password ||
      loginForm.password === mockUserB.password;

    if (usernameCorrect && passwordCorrect) {
      let user: User = mockUserA;
      if (mockUserB.username === loginForm.username) {
        user = mockUserB;
      }
      userDispatch({ type: 'login', payload: { user } });
      localStorage.setItem('user', JSON.stringify(user));
    }

    router.push('/chats');
  };

  return (
    <div
      css={mq({
        ...(theme.components.authPanel as { [key: string]: string }),
        display: 'flex',
        flexDirection: 'column',
        padding: ['64px 28px', '72px 36px'],
        background: theme.colors.secondary,
        width: ['400px', '480px'],
        alignItems: 'center',
        borderRadius: '8px',
        gap: '56px',
      })}
    >
      <h5 css={mq({ fontWeight: 500, margin: 0, color: theme.colors.primary })}>
        Login
      </h5>
      <form
        css={mq({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        })}
      >
        <AuthPanelInput
          name="username"
          placeholder="Username"
          value={loginForm.username}
          onChange={handleFormChange}
        />
        <AuthPanelInput
          name="password"
          type="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleFormChange}
        />
        <div
          css={mq({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            paddingTop: ['28px', '32px'],
          })}
        >
          <AuthPanelButton
            type="secondary"
            label="Sign Up"
            onClick={onSignUp}
          />
          <AuthPanelButton type="primary" label="Log In" onClick={onLogin} />
        </div>
      </form>
    </div>
  );
};
