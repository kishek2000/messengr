/** @jsxImportSource @emotion/react */

import { ChatAvatar } from './chat-avatar';
import { ChatLatestSummary } from './chat-latest-summary';

export const ChatSummarisedView = () => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 'calc(100% - 24px)',
        color: 'white',
        gap: '12px',
        ':hover': {
          // background: 'purple',
          background: '#030610',
        },
        transition: '0.4s',
        padding: '12px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      <ChatAvatar />
      <ChatLatestSummary />
    </div>
  );
};
