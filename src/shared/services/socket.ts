import io from 'socket.io-client';

export const socket = io('http://192.168.0.9:3333');

socket.on('connect', () => console.log('App conectado ao socket'));
