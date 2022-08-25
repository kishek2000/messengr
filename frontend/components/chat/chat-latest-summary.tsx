/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { Message } from '../../model/types';

interface ChatLatestSummaryProps {
  chatName: string;
  messages: Message[];
}

export const ChatLatestSummary: React.FC<ChatLatestSummaryProps> = ({
  chatName,
  messages,
}) => {
  const theme = React.useContext(ThemeContext);

  const lastSentMessage = messages[messages.length - 1];
  const lastSentSummary =
    lastSentMessage.sentBy.username +
    ': ' +
    lastSentMessage.messageContent.content;
  const lastSentAtFull = lastSentMessage.sentAt.toLocaleTimeString();
  const lastSentAtHours = Number.parseInt(lastSentAtFull.split(':')[0]);
  const lastSentAtHoursModded = (lastSentAtHours % 12).toString();
  const lastSentAt = lastSentAtHoursModded + ':' + lastSentAtFull.split(':')[1];
  const lastSentTime = lastSentAt + (lastSentAtHours > 12 ? 'pm' : 'am');

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
      </div>
    </div>
  );
};
