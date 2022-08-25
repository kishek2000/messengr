/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { UserContext } from '../../context/user-context';
import { paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';

export const AuthLogoutButton = () => {
  const { userDispatch } = React.useContext(UserContext);
  const theme = React.useContext(ThemeContext);

  const router = useRouter();
  const onLogout = () => {
    userDispatch({ type: 'logout', payload: '' });
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <button
      css={mq({
        background: theme.colors.primary,
        color: theme.colors.secondary,
        alignSelf: 'flex-start',
        outline: 'none',
        border: 'none',
        fontFamily: paragraphFont,
        fontWeight: 500,
        padding: '12px 16px',
        borderRadius: '8px',
        width: '100%',
        cursor: 'pointer',
      })}
      onClick={onLogout}
    >
      Log Out
    </button>
  );
};
