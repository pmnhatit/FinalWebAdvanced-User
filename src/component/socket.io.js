import io from 'socket.io-client';
// import config from '../config';

const socket = io('http://127.0.0.1:3000');

export default socket;