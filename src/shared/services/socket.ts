import io from 'socket.io-client';

export const socket = io('http://192.168.0.4:3333');

socket.on('connect', () => console.log('App conectado ao socket'));
