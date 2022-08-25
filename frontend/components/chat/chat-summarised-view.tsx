/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Chat } from '../../model/types';
import { ChatAvatar } from './chat-avatar';
import { ChatLatestSummary } from './chat-latest-summary';

interface ChatSummarisedViewProps {
  chat: Chat;
  isActive: boolean;
  toggleActive: VoidFunction;
}

export const ChatSummarisedView: React.FC<ChatSummarisedViewProps> = ({
  chat,
  isActive,
  toggleActive,
}) => {
  const theme = React.useContext(ThemeContext);
  const activeStyle = isActive ? theme.components.chatSummarisedViewActive : {};

  return (
    <div
      css={{
        ...(theme.components.chatSummarisedView as { [key: string]: string }),
        ...(activeStyle as { [key: string]: string }),
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
      onClick={toggleActive}
    >
      <ChatAvatar avatar={chat.chatAvatar} />
      <ChatLatestSummary chatName={chat.chatName} messages={chat.messages} />
    </div>
  );
};
