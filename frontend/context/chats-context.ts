import React from 'react';
import { Chat } from '../model/types';

export interface IChatContextState {
  /**
   * All chats the user is in
   */
  chats: Chat[];
  /**
   * The socket connection for this user with messengr
   */
  socket: WebSocket;
}

export const initialChatContextState = {
  state: {
    chats: [],
    socket: null,
  },
};

/**
 * This is the state of all chats for a given logged in user.
 */
export interface IChatContext {
  state: IChatContextState;
  stateDispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

export const chatStateDispatcher = (
  state: IChatContextState,
  action: { type: string; payload: any }
): any => {
  switch (action.type) {
    case 'openSocket':
      return { ...state, socket: action.payload.socket };
    case 'closeSocket':
      return { ...state, socket: null };
    case 'updateChats':
      return { ...state, chats: action.payload.chats as Chat[] };
    case 'addChat':
      return { ...state, chats: [...state.chats, action.payload.chat as Chat] };
    default:
      break;
  }
};

export const ChatContext = React.createContext<IChatContext>(
  {} as IChatContext
);
