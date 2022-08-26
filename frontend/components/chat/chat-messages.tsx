/** @jsxImportSource @emotion/react */

import React from 'react';
import { Chat } from '../../model/types';
import { mq } from '../../styles/mq';
import { ChatMessage } from './chat-message';

interface ChatMessagesProps {
  chat: Chat;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ chat }) => {
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // height: '100%',
        gap: '28px',
      })}
    >
      {chat.messages.map((message, index) => (
        <ChatMessage message={message} key={index} />
      ))}
    </div>
  );
};
