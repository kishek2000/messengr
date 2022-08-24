/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { headingFont, paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { ChatSummarisedView } from '../chat/chat-summarised-view';

export const MessengrMenu = () => {
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
            color: theme.colors.primary,
            textAlign: 'left',
            borderBottom: theme.colors.divider,
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
  const theme = React.useContext(ThemeContext);
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
        })}
      >
        <ChatSummarisedView />
      </section>
    </section>
  );
};
