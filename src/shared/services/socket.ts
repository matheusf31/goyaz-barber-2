import io from 'socket.io-client';

export const socket = io('http://192.168.0.12:3333');

// eslint-disable-next-line no-console
socket.on('connect', () => console.log('App conectado ao socket'));
