/** @jsxImportSource @emotion/react */

import React from 'react';
import { mq } from '../../styles/mq';
import { Chat, User } from '../../model/types';

interface ChatMemberSelectionProps {
  createChatForm: Chat;
  handleFormChange: (name: string, value: any) => void;
  setMessengrUsers: React.Dispatch<React.SetStateAction<Omit<User, 'password'>[]>>;
  messengrUsers: Omit<User, 'password'>[];
}

export const ChatMemberSelection: React.FC<ChatMemberSelectionProps> = ({
  createChatForm,
  handleFormChange,
  setMessengrUsers,
  messengrUsers,
}) => {
  return (
    <div
      css={mq({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '4px',
      })}
    >
      <strong>Current Members</strong> (click to remove):{' '}
      {createChatForm.members.length > 0
        ? createChatForm.members.map((member, index) => (
            <div
              onClick={() => {
                const filteredMembers = createChatForm.members.filter((addedMember) => {
                  return addedMember.id !== member.id;
                });
                handleFormChange('members', filteredMembers);
                setMessengrUsers([...messengrUsers, member]);
              }}
              css={mq({ cursor: 'pointer' })}
              key={index}
            >
              {member.username}
              {index !== createChatForm.members.length - 1 ? ',' : null}
            </div>
          ))
        : 'Just You'}
    </div>
  );
};
