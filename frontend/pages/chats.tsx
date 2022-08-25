/** @jsxImportSource @emotion/react */

import type { NextPage } from 'next';
import { mq } from '../styles/mq';
import { MessengrMenu } from '../components/menu/messengr-menu';
import { ChatCompleteView } from '../components/chat/chat-complete-view';
import React from 'react';
import { Chat } from '../model/types';
import { UserContext } from '../context/user-context';
import { getUserChatsById } from '../api/chat';

const Chats: NextPage = () => {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [activeChat, setActiveChat] = React.useState<Chat | null>(null);
  const { user } = React.useContext(UserContext);

  // Draft for now, needs to be cleaned up for future
  React.useEffect(() => {
    getUserChatsById(user.id)
      .then((chats) => {
        setChats(chats);
        setActiveChat(chats[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

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
          chats={chats}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
        <ChatCompleteView chat={activeChat} />
      </div>
    </main>
  );
};

export default Chats;
