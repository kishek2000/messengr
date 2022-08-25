import { mockChats } from '../components/chat/__mocks__/mock-chats';

export const getUserChatsById = async (userId: string) => {
  return mockChats;
};
