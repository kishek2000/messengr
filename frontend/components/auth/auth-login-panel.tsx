/** @jsxImportSource @emotion/react */

import React from 'react';
import { mq } from '../../styles/mq';
import { ThemeContext } from '../../context/theme-context';
import { AuthPanelInput } from './auth-panel-input';
import { AuthPanelButton } from './auth-panel-button';
import { useRouter } from 'next/router';
import { UserContext } from '../../context/user-context';
import { ChatContext } from '../../context/chats-context';
import { loginUser } from '../../api/user';

export const AuthLoginPanel = () => {
  const theme = React.useContext(ThemeContext);
  const { userDispatch } = React.useContext(UserContext);
  const { state } = React.useContext(ChatContext);
  const router = useRouter();

  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });

  const handleFormChange = React.useCallback((name: string, value: any) => {
    setLoginForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onSignUp = () => {
    router.push('/signup');
  };

  const onLogin = React.useCallback(async () => {
    try {
      const user = await loginUser(loginForm);
      userDispatch({ type: 'login', payload: { user } });
      localStorage.setItem('user', JSON.stringify(user));

      state.socket.send(
        JSON.stringify({
          type: 'updateChats',
          data: {
            user: user,
          },
        })
      );

      router.push('/chats');
    } catch (e) {
      console.error(e);
    }
  }, [loginForm, router, state.socket, userDispatch]);

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
      <h5 css={mq({ fontWeight: 500, margin: 0, color: theme.colors.primary })}>Login</h5>
      <div
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
          <AuthPanelButton type="secondary" label="Sign Up" onClick={onSignUp} />
          <AuthPanelButton type="primary" label="Log In" onClick={onLogin} />
        </div>
      </div>
    </div>
  );
};
