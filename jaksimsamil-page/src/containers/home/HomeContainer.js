import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
import { getPROFILE } from '../../modules/profile';
import { analyzeBJ } from '../../lib/util/analyzeBJ';
const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));
  useEffect(() => {
    analyzeBJ(profile.solvedBJ);
  }, [profile.solvedBJ]);
  useEffect(() => {
    setLogin(true);
    if (user) {
      let username = user.username;
      dispatch(getPROFILE({ username }));
    }
  }, [dispatch, user]);
  return <HomeForm />;
};
export default withRouter(HomeContainer);
