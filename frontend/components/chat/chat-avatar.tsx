/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';

export const ChatAvatar = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <div
      css={{
        ...(theme.components.chatAvatar as { [key: string]: string }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        overflow: 'none',
        width: '56px',
        height: '56px',
      }}
    >
      {/* <img /> */}
    </div>
  );
};
