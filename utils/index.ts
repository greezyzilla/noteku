import axios, { AxiosRequestConfig } from 'axios';
import { NoteInterface } from '../interfaces';
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

const sortNotesByDate = (a : NoteInterface, b : NoteInterface) => (
  +new Date(b.createdAt) - +new Date(a.createdAt)
);

export { showFormattedDate, fetchWithToken, sortNotesByDate };
