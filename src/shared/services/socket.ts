import io from 'socket.io-client';

export const socket = io('https://goyazbarber.tecteu.com');

socket.on('connect', () => console.log('App conectado ao socket'));
