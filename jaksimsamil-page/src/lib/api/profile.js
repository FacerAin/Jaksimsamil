import client from './client';

export const setBJID = ({ username, BJID }) =>
  client.post('api/profile/setprofile', { username, BJID });
