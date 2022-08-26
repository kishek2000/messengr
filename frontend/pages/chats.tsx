/** @jsxImportSource @emotion/react */

import type { NextPage } from 'next';
import { mq } from '../styles/mq';
import { MessengrMenu } from '../components/menu/messengr-menu';
import { ChatCompleteView } from '../components/chat/chat-complete-view';
import React from 'react';
import { Chat } from '../model/types';
import { ChatContext } from '../context/chats-context';

const Chats: NextPage = () => {
  // Id of the active chat
  const [activeChat, setActiveChat] = React.useState<string>('');
  const { state } = React.useContext(ChatContext);

  return (
    <main
      css={mq({
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        css={mq({
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        })}
      >
        <MessengrMenu
          chats={state.chats || []}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatCompleteView activeChat={activeChat} chats={state.chats || []} />
      </div>
    </main>
  );
};

export default Chats;
