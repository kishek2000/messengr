import { Chat, User } from '../../../model/types';
import { mockUserA } from '../../auth/__mocks__/mock-user-a';
import { mockUserB } from '../../auth/__mocks__/mock-user-b';

export const mockChatC: Chat = {
  chatAvatar: '',
  chatName: 'Another One',
  members: [mockUserA, mockUserB],
  messages: [
    {
      messageContent: {
        content: 'Ok this is the last one lmao',
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
        content: 'Really? Another one?',
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
        content: 'Look idk',
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
        content: 'kk',
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
