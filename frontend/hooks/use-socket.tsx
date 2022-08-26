import React from 'react';
import { v4 } from 'uuid';

let initializedSocket = false;

export const useSocket = (
  sessionId: string,
  stateDispatch: React.Dispatch<{ type: string; payload: any }>
) => {
  React.useEffect(() => {
    if (initializedSocket) {
      return;
    }

    let currSession = v4();

    if (!process.env.NEXT_PUBLIC_WORKER_URL) {
      throw new Error('Worker url not provided in environment.');
    }

    const wss = document.location.protocol === 'http:' ? 'ws://' : 'wss://';
    const hostname = process.env.NEXT_PUBLIC_WORKER_URL;
    const url = wss + hostname + `/websocket?id=${currSession}`;

    const webSocket = new WebSocket(url);
    initializedSocket = true;

    stateDispatch({ type: 'openSocket', payload: { socket: webSocket } });

    const listener = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data);
      if (message.type === 'close') {
        stateDispatch({ type: 'closeSocket', payload: '' });
        webSocket.close();
      } else if (message.type === 'updateChats') {
        stateDispatch({
          type: 'updateChats',
          payload: { chats: message.data.chats },
        });
      }
    };

    webSocket.addEventListener('message', listener);
  }, []);
};
