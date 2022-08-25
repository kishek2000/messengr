/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { UserContext } from '../../context/user-context';
import { Message } from '../../model/types';
import { mq } from '../../styles/mq';
import { ChatAvatar } from './chat-avatar';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { user } = React.useContext(UserContext);
  const theme = React.useContext(ThemeContext);

  const isActiveUser = message.sentBy.username === user.username;
  const messageStyle = isActiveUser
    ? theme.components.messageActiveUser
    : theme.components.message;

  return (
    <div
      css={mq({
        alignSelf: isActiveUser ? 'flex-end' : 'flex-start',
        position: 'relative',
      })}
    >
      {!isActiveUser ? (
        <div
          css={mq({
            position: 'absolute',
            top: '50%',
            transform: 'translate(0%, -50%)',
            left: ['-32px', '-36px'],
          })}
        >
          <ChatAvatar avatar={message.sentBy.avatar} size="small" />
        </div>
      ) : null}
      <p
        css={mq({
          margin: 0,
          ...(messageStyle as { [key: string]: string }),
          borderRadius: '24px',
          padding: '10px 16px',
          textAlign: isActiveUser ? 'right' : 'left',
          fontSize: ['16px', '18px'],
          maxWidth: isActiveUser ? '600px' : '800px',
          wordBreak: 'break-all',
        })}
      >
        {message.messageContent.content}
      </p>
    </div>
  );
};
