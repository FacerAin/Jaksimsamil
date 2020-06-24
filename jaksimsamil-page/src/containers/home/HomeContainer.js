import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
import { getPROFILE } from '../../modules/profile';
const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));
  useEffect(() => {
    console.log(profile);
  }, [profile.solvedBJ]);
  useEffect(() => {
    if (user) {
      let username = user.username;
      dispatch(getPROFILE({ username }));
    }
  }, [dispatch, user]);
  return <HomeForm />;
};
export default withRouter(HomeContainer);
