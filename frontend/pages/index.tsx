/** @jsxImportSource @emotion/react */

import type { NextPage } from 'next';
import { mq } from '../styles/mq';
import { MessengrMenu } from '../components/menu/messengr-menu';
import { ChatCompleteView } from '../components/chat/chat-complete-view';

const Home: NextPage = () => {
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
        <MessengrMenu />
        <ChatCompleteView />
      </div>
    </main>
  );
};

export default Home;
