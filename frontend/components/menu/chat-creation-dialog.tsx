/** @jsxImportSource @emotion/react */

import React from 'react';
import { ThemeContext } from '../../context/theme-context';
import { headingFont } from '../../styles/fonts';
import { mq } from '../../styles/mq';
import { Dialog, DialogContent } from '@mui/material';
import { ChatContext } from '../../context/chats-context';
import { UserContext } from '../../context/user-context';
import { Chat, User } from '../../model/types';
import { getUsers } from '../../api/user';
import { createChat } from '../../api/chat';
import { ChatCreationForm } from './chat-creation-form';
import { v4 } from 'uuid';

interface ChatCreationDialogProps {
  openChatCreation: boolean;
  toggleChatCreationDialog: (open: boolean) => void;
}

export const ChatCreationDialog: React.FC<ChatCreationDialogProps> = ({
  openChatCreation,
  toggleChatCreationDialog,
}) => {
  const theme = React.useContext(ThemeContext);
  const { state } = React.useContext(ChatContext);
  const { user } = React.useContext(UserContext);
  const [messengrUsers, setMessengrUsers] = React.useState<Omit<User, 'password'>[]>([]);
  const [createChatForm, setCreateChatForm] = React.useState<Chat>({
    chatAvatar: '',
    chatName: '',
    members: [],
    messages: [],
    owner: user,
    id: v4(),
  });

  const getUsersCallback = React.useCallback(async () => {
    if (state.socket) {
      getUsers()
        .then((users) => {
          const chosenUsers = createChatForm.members.map((m) => m.id);
          setMessengrUsers(users.filter((member) => !chosenUsers.includes(member.id)));
          state.socket.send(
            JSON.stringify({
              type: 'updateChats',
              data: {
                user: user,
              },
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [createChatForm.members, state.socket, user]);

  React.useEffect(() => {
    getUsersCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.socket, openChatCreation]);

  const handleFormChange = React.useCallback((name: string, value: any) => {
    setCreateChatForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onSubmit = React.useCallback(async () => {
    const createdChat = {
      ...createChatForm,
      members: [...createChatForm.members, user],
    };

    await createChat(createdChat);

    state.socket.send(
      JSON.stringify({
        type: 'updateChats',
        data: {
          user: user,
        },
      })
    );
    toggleChatCreationDialog(false);
  }, [createChatForm, state.socket, toggleChatCreationDialog, user]);

  return (
    <Dialog
      open={openChatCreation}
      onClose={() => toggleChatCreationDialog(false)}
      maxWidth={false}
    >
      <DialogContent
        css={mq({
          borderRadius: '0px',
          display: 'flex',
          flexDirection: 'column',
          color: theme.colors.primary,
          border: 'none',
          width: '600px',
          height: '400px',
          background: theme.colors.secondary,
          justifyContent: 'center',
        })}
      >
        <div
          css={mq({
            padding: '32px 0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: 'calc(100% - 64px)',
          })}
        >
          <h3 css={mq({ fontFamily: headingFont, alignSelf: 'center' })}>Create Chat</h3>
          <ChatCreationForm
            createChatForm={createChatForm}
            handleFormChange={handleFormChange}
            messengrUsers={messengrUsers}
            setMessengrUsers={setMessengrUsers}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
