/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Chat } from '../../model/types';
import { headingFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { AuthLogoutButton } from '../auth/auth-logout-button';
import { MenuChatList } from './menu-chat-list';
import { BiCommentAdd } from 'react-icons/bi';
import { ChatCreationDialog } from './chat-creation-dialog';

export interface MessengrMenuProps {
  chats: Chat[];
  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;
}

export const MessengrMenu: React.FC<MessengrMenuProps> = ({ chats, activeChat, setActiveChat }) => {
  const theme = React.useContext(ThemeContext);
  const style = theme['components']['menu'] as { [key: string]: string };

  const [openChatCreation, setOpenChatCreation] = React.useState(false);
  const toggleChatCreationDialog = React.useCallback((open: boolean) => {
    setOpenChatCreation(open);
  }, []);

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
      <ChatCreationDialog
        openChatCreation={openChatCreation}
        toggleChatCreationDialog={toggleChatCreationDialog}
      />
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
          <hgroup
            css={mq({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
              borderBottom: theme.colors.divider,
              paddingBottom: '12px',
            })}
          >
            <h3
              css={mq({
                fontFamily: headingFont,
                fontSize: ['20px', '24px'],
                fontWeight: 700,
                color: theme.colors.primary,
                textAlign: 'left',

                margin: 0,
              })}
            >
              Chats
            </h3>
            <button
              css={mq({
                outline: 'none',
                border: 'none',
                background: theme.colors.toggle,
                color: theme.colors.primary,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.9,
                },
                transition: '0.2s',
              })}
              onClick={() => toggleChatCreationDialog(true)}
            >
              <BiCommentAdd />
            </button>
          </hgroup>
          <MenuChatList chats={chats} activeChat={activeChat} setActiveChat={setActiveChat} />
        </div>
        <AuthLogoutButton />
      </div>
    </aside>
  );
};
