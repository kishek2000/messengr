/** @jsxImportSource @emotion/react */

import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { ThemeContext } from '../../context/theme-context';
import { mq } from '../../styles/mq';

export const ChatMessageInput = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '-28px',
      })}
    >
      <input
        css={mq({
          ...(theme.input.search as { [key: string]: string }),
          width: '100%',
          borderRadius: '24px',
          padding: '12px 16px',
        })}
        placeholder="Type a message..."
      />
      <div
        css={mq({
          position: 'absolute',
          top: '50%',
          transform: 'translate(0%, -50%)',
          left: ['-32px', '-36px'],
          borderRadius: '50%',
          width: ['24px', '28px'],
          height: ['24px', '28px'],
          color: theme.colors.welcome,
          cursor: 'pointer',
          ':hover': {
            opacity: 0.9,
          },
          transition: '0.3s',
        })}
      >
        <AiFillPlusCircle css={mq({ width: '100%', height: '100%' })} />
      </div>
    </div>
  );
};
