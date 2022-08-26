import { mockChats } from '../components/chat/__mocks__/mock-chats';
import { Chat } from '../model/types';

export const getUserChatsById = async (userId: string) => {
  return [];
};

export const createChat = async (createdChat: Chat) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.log('Please add api url in env.');
    }

    const response = await fetch(apiUrl + 'chat', {
      method: 'POST',
      body: JSON.stringify(createdChat),
      headers: { 'Content-Type': 'application/json' },
    });

    return await response.json();
  } catch (e) {
    throw new Error(`${e}`);
  }
};
