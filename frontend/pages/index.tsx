/** @jsxImportSource @emotion/react */

import type { NextPage } from 'next';
import { mq } from '../styles/mq';
import React from 'react';
import { ThemeContext } from '../context/theme-context';

const Home: NextPage = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <main
      css={mq({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.tertiary,
        color: theme.colors.primary,
      })}
    >
      <h1>Welcome to Messengr</h1>
    </main>
  );
};

export default Home;
