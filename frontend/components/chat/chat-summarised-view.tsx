/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { ChatAvatar } from './chat-avatar';
import { ChatLatestSummary } from './chat-latest-summary';

export const ChatSummarisedView = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <div
      css={{
        ...(theme.components.chatSummarisedView as { [key: string]: string }),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 'calc(100% - 24px)',
        color: theme.colors.primary,
        gap: '12px',
        transition: '0.4s',
        padding: '12px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      <ChatAvatar />
      <ChatLatestSummary />
    </div>
  );
};
