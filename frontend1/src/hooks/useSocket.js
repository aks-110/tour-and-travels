import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
