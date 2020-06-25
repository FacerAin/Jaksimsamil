import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
import { getPROFILE, initializeProfile } from '../../modules/profile';
const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다  ');
      history.push('/login');
    } else {
      let username = user.username;
      dispatch(getPROFILE({ username }));
      return () => {
        dispatch(initializeProfile());
      };
    }
  }, [dispatch, user, history]);
  useEffect(() => {
    console.log(profile);
  }, [profile]);
  useEffect(() => {
    if (user) {
      let username = user.username;
      dispatch(getPROFILE({ username }));
    }
  }, [dispatch, user]);
  return <HomeForm PSdata={profile.solvedBJ_date} goalNum={profile.goalNum} />;
};
export default withRouter(HomeContainer);
