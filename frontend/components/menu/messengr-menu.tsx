/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Chat } from '../../model/types';
import { headingFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { AuthLogoutButton } from '../auth/auth-logout-button';
import { MenuChatList } from './menu-chat-list';

export interface MessengrMenuProps {
  chats: Chat[];
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

export const MessengrMenu: React.FC<MessengrMenuProps> = ({
  chats,
  activeChat,
  setActiveChat,
}) => {
  const theme = React.useContext(ThemeContext);
  const style = theme['components']['menu'] as { [key: string]: string };

  return (
    <aside
      css={mq({
        ...style,
        minWidth: ['360px', '400px'],
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2',
      })}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '90%',
          justifyContent: 'space-between',
          width: '85%',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '90%',
          }}
        >
          <h3
            css={mq({
              fontFamily: headingFont,
              fontSize: ['20px', '24px'],
              fontWeight: 700,
              color: theme.colors.primary,
              textAlign: 'left',
              borderBottom: theme.colors.divider,
              paddingBottom: '12px',
              margin: 0,
            })}
          >
            Chats
          </h3>
          <MenuChatList
            chats={chats}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
          />
        </div>
        <AuthLogoutButton />
      </div>
    </aside>
  );
};
