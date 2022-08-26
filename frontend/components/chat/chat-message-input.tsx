/** @jsxImportSource @emotion/react */

import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { ChatContext } from '../../context/chats-context';
import { ThemeContext } from '../../context/theme-context';
import { UserContext } from '../../context/user-context';
import { Chat, Message } from '../../model/types';
import { mq } from '../../styles/mq';

export const ChatMessageInput: React.FC<{ chat: Chat }> = ({ chat }) => {
  const theme = React.useContext(ThemeContext);
  const { state } = React.useContext(ChatContext);
  const [message, setMessage] = React.useState('');
  const { user } = React.useContext(UserContext);

  const onSubmit = React.useCallback(() => {
    const messageObj: Message = {
      messageContent: {
        content: message,
        dataType: 'text',
      },
      seenBy: [],
      sentAt: new Date().toLocaleString(),
      sentBy: user,
    };

    state.socket.send(
      JSON.stringify({
        type: 'addMessage',
        data: {
          message: messageObj,
          chat,
        },
      })
    );
    setMessage('');
  }, [state, user, chat, message]);

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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
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
