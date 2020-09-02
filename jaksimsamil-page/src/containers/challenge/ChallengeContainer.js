import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChallengeForm from '../../components/challenge/ChallengeForm';
const options = [
  { code: 0, label: '전체' },
  { code: 1, label: '준비' },
  { code: 2, label: '진행 중' },
  { code: 3, label: '마감' },
];
const ChallengeContainer = () => {
  const dispatch = useDispatch();
  const [viewcategory, setViewcategory] = useState(options[0]);
  const [partcategory, setPartcategory] = useState(options[0]);
  useEffect(() => {
    console.log(viewcategory);
    console.log(partcategory);
  }, [viewcategory, partcategory]);

  return (
    <ChallengeForm
      options={options}
      setViewcategory={setViewcategory}
      setPartcategory={setPartcategory}
    />
  );
};

export default withRouter(ChallengeContainer);
