import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../config';

let socketInstance = null;

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(API_BASE_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }

    setSocket(socketInstance);

    return () => {
      // We don't disconnect on unmount so the singleton stays alive across page navigations
    };
  }, []);

  return socket;
};
