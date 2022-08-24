/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { mq } from '../../styles/mq';

export const ChatCompleteView = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <section
      css={mq({
        ...(theme.components.chatCompleteView as { [key: string]: string }),
        width: '100%',
        height: '100%',
      })}
    ></section>
  );
};
