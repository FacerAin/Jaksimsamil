import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChallengeForm from '../../components/challenge/ChallengeForm';

const ChallengeContainer = () => {
  return <ChallengeForm />;
};

export default ChallengeContainer;
