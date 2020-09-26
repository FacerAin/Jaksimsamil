import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChallengeForm from '../../components/challenge/ChallengeForm';
import {
  getChallengelist,
  getChallengeuser,
  participateChallenge,
  initializeChallenge,
} from '../../modules/challenge';
const options = [
  { code: 0, label: '전체', query: 'all' },
  { code: 1, label: '준비', query: 'enrolled' },
  { code: 2, label: '진행 중', query: 'progress' },
  { code: 3, label: '마감', query: 'end' },
];
const ChallengeContainer = () => {
  const dispatch = useDispatch();
  const { challengeList, challengeUser, username } = useSelector(
    ({ challenge, user }) => ({
      challengeList: challenge.challengeList,
      challengeUser: challenge.challengeUser,
      username: user.user.username,
    }),
  );
  const [viewcategory, setViewcategory] = useState(options[0]);
  const [partcategory, setPartcategory] = useState(options[0]);

  const onParticipate = (challengeName) => {
    dispatch(participateChallenge({ challengeName, username }));
  };

  useEffect(() => {
    dispatch(getChallengelist(viewcategory.query));
  }, [viewcategory]);
  useEffect(() => {
    if (username) {
      dispatch(getChallengeuser(username));
    }
  }, [partcategory]);
  useEffect(() => {
    console.log(challengeUser);
  }, [challengeList, challengeUser]);

  return (
    <ChallengeForm
      options={options}
      setViewcategory={setViewcategory}
      setPartcategory={setPartcategory}
      challengeList={challengeList}
      challengeUser={challengeUser}
      onParticipate={onParticipate}
    />
  );
};

export default withRouter(ChallengeContainer);
