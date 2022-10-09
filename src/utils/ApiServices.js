import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import preferences from './preferences';

export const BASE_URL = 'https://babzbackend.herokuapp.com';
const instance = Axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(preferences.KEYS.ACCESS_TOKEN);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjFhMzg1Yjc2NGFiMDAxNjFiMWNiYyIsImFjY291bnRUeXBlIjoiZG9jdG9yIiwiaWF0IjoxNTk2MDQ1NDE0fQ.U3Hr1UHUoWYP40SljtKCGsN-lbfELcb_7Z_NuOyUdQ0'
    if (token) {
      // config.headers.Authorization = 'Token ' + token;
    }
    config.headers.Accept = '*/*';
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  async response => {
    // if(response?.data){
    //     console.log('axios-response', response.status, response.data)
    // }

    return response;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
