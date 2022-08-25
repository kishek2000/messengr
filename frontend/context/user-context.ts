import React from 'react';
import { User } from '../model/types';

interface IUserContext {
  user: User;
  userDispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

export const initialUser = {
  user: {
    avatar: '',
    password: '',
    username: '',
    id: '',
  } as User,
};

export const userDispatcher = (
  state: User,
  action: { type: String; payload: any }
) => {
  switch (action.type) {
    case 'login':
      return { ...state, ...action.payload.user };
    case 'logout':
      return { ...initialUser.user };
    default:
      break;
  }
};

export const UserContext = React.createContext<IUserContext>({
  ...initialUser,
  userDispatch: () => {},
});
