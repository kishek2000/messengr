/** @jsxImportSource @emotion/react */

import type { NextPage } from 'next';
import { mq } from '../styles/mq';
import React from 'react';
import { ThemeContext } from '../context/theme-context';
import { headingFont } from '../styles/fonts';
import { AiFillMessage } from 'react-icons/ai';
import { AuthRegisterPanel } from '../components/auth/auth-register-panel';

const SignUp: NextPage = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <main
      css={mq({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.tertiary,
        fontFamily: headingFont,
        fontSize: ['24px', '28px'],
        gap: '48px',
      })}
    >
      <hgroup
        css={mq({
          color: theme.colors.welcome,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        })}
      >
        <AiFillMessage size={64} />
        <h1>Welcome to Messengr</h1>
      </hgroup>
      <AuthRegisterPanel />
    </main>
  );
};

export default SignUp;
