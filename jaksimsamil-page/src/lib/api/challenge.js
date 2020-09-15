import client from './client';

export const list = (status) => client.get(`api/challenge/list/${status}`);

export const getChallengeByUsername = (username) => {
  console.log(username);
  return client.get(`api/challenge/getchallenge?username=${username}`);
};

export const participate = ({ username, challengeName }) =>
  client.post('api/challenge/participate', {
    username: username,
    challengeName: challengeName,
  });
