import axios, {AxiosResponse} from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
     'Accept': 'application/json',
  },
  params:{
    'apikey':'af60add3'
  }
});

export {axiosClient};
