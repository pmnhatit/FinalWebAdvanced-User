import io from 'socket.io-client';
// import config from '../config';

const socket = io('https://apiuser-caro.herokuapp.com/');
const socket_1 = io('http://localhost:5000/');
export default socket;