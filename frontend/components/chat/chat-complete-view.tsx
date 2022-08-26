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
  activeChat: string;
  chats: Chat[];
}

export const ChatCompleteView: React.FC<ChatCompleteViewProps> = ({ activeChat, chats }) => {
  const [chat, setChat] = React.useState<Chat | null>(
    activeChat !== '' ? chats.filter((storedChat) => storedChat.id === activeChat)[0] : null
  );
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    setChat(
      activeChat !== '' ? chats.filter((storedChat) => storedChat.id === activeChat)[0] : null
    );
  }, [chats, activeChat]);

  return (
    <section
      css={mq({
        ...(theme.components.chatCompleteView as { [key: string]: string }),
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: paragraphFont,
        alignItems: 'center',
        color: theme.colors.primary,
        justifyContent: 'center',
      })}
    >
      {!chat ? (
        <span
          css={mq({
            color: theme.colors.grey,
            opacity: 0.6,
            fontSize: ['20px', '24px'],
          })}
        >
          Add a new chat to get started!
        </span>
      ) : (
        <div
          css={mq({
            width: ['calc(100% - 90px)', 'calc(100% - 120px)'],
            height: '90%',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          })}
        >
          <section
            css={mq({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              height: '100%',
              overflowY: 'auto',
              width: '100%',
              paddingRight: '24px',
              marginRight: '-24px',
            })}
          >
            <ChatHeader chat={chat} />
            <div
              css={mq({
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                paddingRight: '24px',
                marginRight: '-24px',
              })}
            >
              <ChatMessages chat={chat} />
            </div>
          </section>
          <ChatMessageInput chat={chat} />
        </div>
      )}
    </section>
  );
};
