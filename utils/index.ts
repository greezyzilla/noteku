import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken } from './lib/cache';

const showFormattedDate = (date : string) => new Date(date).toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export interface Note{
  id: number | string;
  title: string;
  body: string;
  archived: boolean;
  createdAt: string;
}

async function fetchWithToken(baseURL : string, options : AxiosRequestConfig<any>) {
  const response = await axios({
    baseURL,
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.data;
}

export { showFormattedDate, fetchWithToken };
