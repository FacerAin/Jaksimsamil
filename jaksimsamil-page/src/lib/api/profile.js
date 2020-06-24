import client from './client';

export const setBJID = ({ username, userBJID }) =>
  client.post('api/profile/setprofile', {
    username: username,
    userBJID: userBJID,
  });
export const setPROFILE = (postdata) =>
  client.post('api/profile/setprofile', postdata);
export const getPROFILE = ({ username }) =>
  client.post('api/profile/getprofile', { username });

export const syncBJ = ({ username }) =>
  client.patch('api/profile/syncBJ', { username });
