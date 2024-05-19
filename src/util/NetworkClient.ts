import axios, {AxiosResponse} from 'axios';
const instance = axios.create({
  baseURL: 'https://streaming-availability.p.rapidapi.com/',
  timeout: 2000,
  headers: {
    'X-RapidAPI-Key': '104c18206dmshc1fc18c7cebb4e2p149c84jsn4fd8917e0b11',
    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
  },
});

export {instance};
