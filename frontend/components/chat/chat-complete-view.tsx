/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Chat } from '../../model/types';
import { paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { ChatMessages } from './chat-messages';
import { ChatMessageInput } from './chat-message-input';
import { ChatHeader } from './chat-header';

interface ChatCompleteViewProps {
  chat: Chat | null;
}

export const ChatCompleteView: React.FC<ChatCompleteViewProps> = ({ chat }) => {
  const theme = React.useContext(ThemeContext);

  return (
    <section
      css={mq({
        ...(theme.components.chatCompleteView as { [key: string]: string }),
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      {!chat ? (
        <span>Loading...</span>
      ) : (
        <div
          css={mq({
            width: ['calc(100% - 90px)', 'calc(100% - 120px)'],
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            color: theme.colors.primary,
            gap: '48px',
            fontFamily: paragraphFont,
          })}
        >
          <section
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              height: '100%',
            })}
          >
            <ChatHeader chat={chat} />
            <ChatMessages chat={chat} />
          </section>
          <ChatMessageInput />
        </div>
      )}
    </section>
  );
};
