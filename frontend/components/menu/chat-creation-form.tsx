/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { paragraphFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { AuthPanelInput } from '../auth/auth-panel-input';
import { Chat, User } from '../../model/types';
import { ChatMemberSelection } from './chat-member-selection';
import { ChatMemberSelector } from './chat-member-selector';

interface ChatCreationFormProps {
  createChatForm: Chat;
  handleFormChange: (name: string, value: any) => void;
  messengrUsers: Omit<User, 'password'>[];
  setMessengrUsers: React.Dispatch<
    React.SetStateAction<Omit<User, 'password'>[]>
  >;
  onSubmit: () => Promise<void>;
}
export const ChatCreationForm: React.FC<ChatCreationFormProps> = ({
  createChatForm,
  handleFormChange,
  messengrUsers,
  setMessengrUsers,
  onSubmit,
}) => {
  const theme = React.useContext(ThemeContext);

  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontFamily: paragraphFont,
        width: '100%',
        height: '100%',
      })}
    >
      <AuthPanelInput
        placeholder="Name of chat"
        value={createChatForm.chatName}
        name="chatName"
        onChange={handleFormChange}
      />
      <div
        css={mq({
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        <p css={mq({ margin: 0 })}>Members in Chat</p>
        {messengrUsers.length <= 1 ? null : (
          <ChatMemberSelector
            handleFormChange={handleFormChange}
            createChatForm={createChatForm}
            messengrUsers={messengrUsers}
            setMessengrUsers={setMessengrUsers}
          />
        )}
        <ChatMemberSelection
          createChatForm={createChatForm}
          handleFormChange={handleFormChange}
          setMessengrUsers={setMessengrUsers}
          messengrUsers={messengrUsers}
        />
      </div>
      <button
        css={mq({
          ...(theme.components.buttonPrimary as {}),
          outline: 'none',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          alignSelf: 'center',
          marginTop: 'auto',
          cursor: 'pointer',
        })}
        onClick={onSubmit}
      >
        Create
      </button>
    </div>
  );
};
