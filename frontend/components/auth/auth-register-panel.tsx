/** @jsxImportSource @emotion/react */

import { mq } from '../../styles/mq';
import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { AuthPanelInput } from './auth-panel-input';
import { AuthPanelButton } from './auth-panel-button';
import { useRouter } from 'next/router';

export const AuthRegisterPanel = () => {
  const router = useRouter();
  const theme = React.useContext(ThemeContext);

  const [registerForm, setRegisterForm] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleFormChange = React.useCallback(
    (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterForm((form) => ({ ...form, [name]: e.target.value }));
    },
    []
  );

  const onSignUp = React.useCallback(() => {
    router.push('/chats');
  }, [router]);

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
        Register
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
          value={registerForm.username}
          onChange={handleFormChange}
        />
        <AuthPanelInput
          name="password"
          type="password"
          placeholder="Password"
          value={registerForm.password}
          onChange={handleFormChange}
        />
        <AuthPanelInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={registerForm.confirmPassword}
          onChange={handleFormChange}
        />
        <div
          css={mq({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-end',
            paddingTop: ['28px', '32px'],
          })}
        >
          <AuthPanelButton
            type="primary"
            label="Take me in!"
            onClick={onSignUp}
          />
        </div>
      </form>
    </div>
  );
};
