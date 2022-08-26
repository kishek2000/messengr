/** @jsxImportSource @emotion/react */

import React, { Fragment } from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Message } from '../../model/types';

interface ChatLatestSummaryProps {
  chatName: string;
  messages: Message[];
}

export const ChatLatestSummary: React.FC<ChatLatestSummaryProps> = ({ chatName, messages }) => {
  const theme = React.useContext(ThemeContext);
  const { lastSentSummary, lastSentTime } = getSummary(messages);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: 'calc(100% - 64px - 12px)',
      }}
    >
      <h4 css={{ margin: 0 }}>{chatName}</h4>
      <div
        css={{
          color: theme.colors.grey,
          fontSize: '12px',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {messages.length === 0 ? (
          <div
            css={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            No messages sent yet...
          </div>
        ) : (
          <Fragment>
            <p
              css={{
                margin: 0,
                maxWidth: '80%',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {lastSentSummary}
            </p>
            <div
              css={{
                maxWidth: '20%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span css={{ fontSize: '8px' }}>•</span>
              {lastSentTime}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

function getSummary(messages: Message[]) {
  let lastSentSummary = '';
  let lastSentTime = '';
  if (messages.length > 0) {
    const lastSentMessage = messages[messages.length - 1];
    lastSentSummary =
      lastSentMessage.sentBy.username + ': ' + lastSentMessage.messageContent.content;
    const lastSentAtFull = lastSentMessage.sentAt;
    const lastSentAtTime = lastSentAtFull.split(' ')[1];
    const lastSentAtHours = Number.parseInt(lastSentAtTime.split(':')[0]);
    const lastSentAtHoursModded = (lastSentAtHours % 12).toString();
    const lastSentAt = lastSentAtHoursModded + ':' + lastSentAtTime.split(':')[1];
    lastSentTime = lastSentAt + (lastSentAtHours > 12 ? 'pm' : 'am');
  }
  return { lastSentSummary, lastSentTime };
}
