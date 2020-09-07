import client from './client';

export const list = (status) => client.get(`api/challenge/list/${status}`);
