import { Chat, User } from '../../../model/types';
import { mockUserA } from '../../auth/__mocks__/mock-user-a';
import { mockUserB } from '../../auth/__mocks__/mock-user-b';

export const mockChatB: Chat = {
  chatAvatar: '',
  chatName: 'Chat b',
  members: [mockUserA, mockUserB],
  messages: [
    {
      messageContent: {
        content: 'This is chat b...',
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
        content: 'Why did we make another chat lol',
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
        content: 'Just to test stuff out',
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
        content: 'Well it better be working!',
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
  ],
  owner: mockUserB,
};
