import axios from 'axios';

// If you using the Android Studio emulator the baseURL is: 'https://10.0.2.3:3333'
// If you using the IOS emulator the baseURL is: 'https://localhost:3333'
const api = axios.create({
  baseURL: 'https://goyazbarber.tecteu.com',
});

export default api;
