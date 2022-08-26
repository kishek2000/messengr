/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { mq } from '../../styles/mq';
import { UserContext } from '../../context/user-context';
import { Chat, User } from '../../model/types';

interface ChatMemberSelectorProps {
  handleFormChange: (name: string, value: any) => void;
  createChatForm: Chat;
  messengrUsers: Omit<User, 'password'>[];
  setMessengrUsers: React.Dispatch<
    React.SetStateAction<Omit<User, 'password'>[]>
  >;
}
export const ChatMemberSelector: React.FC<ChatMemberSelectorProps> = ({
  handleFormChange,
  createChatForm,
  messengrUsers,
  setMessengrUsers,
}) => {
  const theme = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);

  return (
    <div
      css={mq({
        ...(theme.input.search as {}),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
      })}
    >
      <select
        onChange={(e) => {
          const member = JSON.parse(e.target.value);
          handleFormChange('members', [...createChatForm.members, member]);
          const filteredUsers = messengrUsers.filter((addedMember) => {
            return addedMember.id !== member.id;
          });
          setMessengrUsers(filteredUsers);
        }}
        css={mq({
          background: theme.colors.secondary,
          color: theme.colors.grey,
          opacity: 0.3,
          border: 'none',
          outline: 'none',
          width: '96.5%',
          cursor: 'pointer',
          padding: '12px 0px',
        })}
        value="default"
      >
        <option disabled={true} value="default">
          Select a User
        </option>
        {messengrUsers.map((messengrUser, index) => {
          if (messengrUser.id !== user.id) {
            return (
              <option key={index} value={JSON.stringify(messengrUser)}>
                {messengrUser.username}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};
