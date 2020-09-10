import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChallengeForm from '../../components/challenge/ChallengeForm';
import { getChallenge, initializeChallenge } from '../../modules/challenge';
const options = [
  { code: 0, label: '전체', query: 'all' },
  { code: 1, label: '준비', query: 'enrolled' },
  { code: 2, label: '진행 중', query: 'progress' },
  { code: 3, label: '마감', query: 'end' },
];
const ChallengeContainer = () => {
  const dispatch = useDispatch();
  const { challengeList } = useSelector(({ challenge }) => ({
    challengeList: challenge.challengeList,
  }));
  const [viewcategory, setViewcategory] = useState(options[0]);
  const [partcategory, setPartcategory] = useState(options[0]);
  useEffect(() => {
    console.log(viewcategory);
    console.log(partcategory);
    dispatch(getChallenge(viewcategory.query));
  }, [viewcategory, partcategory]);
  useEffect(() => {
    console.log(challengeList);
  }, [challengeList]);

  return (
    <ChallengeForm
      options={options}
      setViewcategory={setViewcategory}
      setPartcategory={setPartcategory}
      challengeData={challengeList}
    />
  );
};

export default withRouter(ChallengeContainer);
