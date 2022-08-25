/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Chat } from '../../model/types';
import { headingFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { ChatAvatar } from './chat-avatar';

interface ChatHeaderProps {
  chat: Chat;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ chat }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <hgroup
      css={mq({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
      })}
    >
      <ChatAvatar avatar={chat.chatAvatar} size="large" />
      <hgroup
        css={mq({ display: 'flex', flexDirection: 'column', gap: '4px' })}
      >
        <h1
          css={mq({
            fontFamily: headingFont,
            margin: 0,
            fontSize: ['28px', '36px'],
            fontWeight: 500,
          })}
        >
          {chat.chatName}
        </h1>
        <span css={mq({ margin: 0, color: theme.colors.grey })}>
          {chat.members.length} members
        </span>
      </hgroup>
    </hgroup>
  );
};
