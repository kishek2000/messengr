/** @jsxImportSource @emotion/react */
import React from 'react';

import { ThemeContext } from '../../context/theme-context';
import { paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { ChatSummarisedView } from '../chat/chat-summarised-view';
import { MessengrMenuProps } from './messengr-menu';

export const MenuChatList: React.FC<MessengrMenuProps> = ({
  chats,
  activeChat,
  setActiveChat,
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <section
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '95%',
        fontFamily: paragraphFont,
        gap: '24px',
      })}
    >
      <input
        placeholder="Search"
        css={{
          ...(theme.input.search as { [key: string]: string }),
          border: 'none',
          outline: 'none',
          padding: '16px',
          borderRadius: '4px',
          fontWeight: 500,
        }}
      />
      <section
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          overflowY: 'auto',
          height: '100%',
          paddingRight: '24px',
          marginRight: '-24px',
        })}
      >
        {chats ? (
          chats.map((chat, index) => (
            <ChatSummarisedView
              key={index}
              chat={chat}
              isActive={chat === activeChat}
              toggleActive={() => setActiveChat(chat)}
            />
          ))
        ) : (
          <span>Loading chats...</span>
        )}
      </section>
    </section>
  );
};
