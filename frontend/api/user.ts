import { User } from '../model/types';

export const getUsers = async () => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.log('Please add api url in env.');
    }

    const response = await fetch(apiUrl + 'users');
    return (await response.json()).users as User[];
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const loginUser = async (loginForm: { username: string; password: string }) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw Error();
    }

    const response = await fetch(apiUrl + 'login', {
      method: 'POST',
      body: JSON.stringify(loginForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return (await response.json()).user;
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const registerUser = async (createdUser: User) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw Error();
    }
    const response = await fetch(apiUrl + 'register', {
      method: 'POST',
      body: JSON.stringify(createdUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.text();
  } catch (e) {
    throw new Error(`${e}`);
  }
};
