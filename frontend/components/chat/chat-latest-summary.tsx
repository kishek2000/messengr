/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';

export const ChatLatestSummary = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: 'calc(100% - 64px - 12px)',
      }}
    >
      <h4 css={{ margin: 0 }}>Chat Name</h4>
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
          Person: Messagesafdjkhsdkjfsdhfkjsadfhsakdjfsahdfkjsdfhsdlkjf
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
          <span css={{ fontSize: '8px' }}>•</span>8:45pm
        </div>
      </div>
    </div>
  );
};
