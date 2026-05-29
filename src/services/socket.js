import { io } from 'socket.io-client';

let socket = null;

const getSocketUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL || '';
  if (base) {
    return base.replace(/\/api\/?$/, '');
  }
  return import.meta.env.VITE_SUPPORT_SOCKET_URL || 'http://localhost:3010';
};

export const getSocket = () => {
  if (!socket) {
    socket = io(getSocketUrl(), {
      transports: ['websocket'],
      autoConnect: true,
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
