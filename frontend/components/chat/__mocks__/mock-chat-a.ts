import { Chat, User } from '../../../model/types';
import { mockUserA } from '../../auth/__mocks__/mock-user-a';
import { mockUserB } from '../../auth/__mocks__/mock-user-b';

export const mockChatA: Chat = {
  chatAvatar: '',
  chatName: 'Testing chat',
  members: [mockUserA, mockUserB],
  messages: [
    {
      messageContent: {
        content:
          "First message of the chat! Welcome :D! I'm just testing out long messages with this one right here, making sure it wraps my message like I want it to",
        dataType: 'text',
      },
      seenBy: {
        username: mockUserA.username,
        avatar: mockUserA.avatar,
      } as Pick<User, 'username' | 'avatar'>,
      sentAt: new Date(2022, 8, 24, 18, 40, 20, 100),
      sentBy: {
        username: mockUserA.username,
        avatar: mockUserA.avatar,
      } as Pick<User, 'username' | 'avatar'>,
    },
    {
      messageContent: {
        content: 'Thanks! Glad to be here',
        dataType: 'text',
      },
      seenBy: {
        username: mockUserB.username,
        avatar: mockUserB.avatar,
      } as Pick<User, 'username' | 'avatar'>,
      sentAt: new Date(2022, 8, 24, 18, 40, 20, 100),
      sentBy: {
        username: mockUserB.username,
        avatar: mockUserB.avatar,
      } as Pick<User, 'username' | 'avatar'>,
    },
    {
      messageContent: {
        content: 'What do you do?',
        dataType: 'text',
      },
      seenBy: {
        username: mockUserA.username,
        avatar: mockUserA.avatar,
      } as Pick<User, 'username' | 'avatar'>,
      sentAt: new Date(2022, 8, 24, 18, 40, 20, 100),
      sentBy: {
        username: mockUserA.username,
        avatar: mockUserA.avatar,
      } as Pick<User, 'username' | 'avatar'>,
    },
    {
      messageContent: {
        content: 'I make stuff idfk',
        dataType: 'text',
      },
      seenBy: {
        username: mockUserB.username,
        avatar: mockUserB.avatar,
      } as Pick<User, 'username' | 'avatar'>,
      sentAt: new Date(2022, 8, 24, 18, 40, 20, 100),
      sentBy: {
        username: mockUserB.username,
        avatar: mockUserB.avatar,
      } as Pick<User, 'username' | 'avatar'>,
    },
  ],
  owner: mockUserA,
};
