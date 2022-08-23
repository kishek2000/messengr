/** @jsxImportSource @emotion/react */

import { headingFont, paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { ChatSummarisedView } from '../chat/chat-summarised-view';

export const MessengrMenu = () => {
  return (
    <aside
      css={mq({
        minWidth: ['360px', '400px'],
        height: '100%',
        background: '#060917',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '2px 0px 20px rgba(0, 0, 0, 1)',
        zIndex: '2',
      })}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          height: '95%',
          justifyContent: 'space-between',
          width: '85%',
        }}
      >
        <h3
          css={mq({
            fontFamily: headingFont,
            fontSize: ['20px', '24px'],
            fontWeight: 700,
            color: 'white',
            textAlign: 'left',
            borderBottom: '1px solid rgba(180, 180, 180, 0.15)',
            paddingBottom: '12px',
          })}
        >
          Chats
        </h3>
        <AllChatsMenu />
      </div>
    </aside>
  );
};

export const AllChatsMenu = () => {
  return (
    <section
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        fontFamily: paragraphFont,
        gap: '24px',
      })}
    >
      <input
        placeholder="Search"
        css={{
          background: '#030610',
          border: 'none',
          // border: '1.5px solid purple',
          outline: 'none',
          padding: '16px',
          borderRadius: '4px',
          '::placeholder': {
            opacity: '0.3',
            color: 'white',
            fontWeight: 400,
          },
          color: 'white',
          fontWeight: 500,
        }}
      />
      <section
        css={mq({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        <ChatSummarisedView />
      </section>
    </section>
  );
};
