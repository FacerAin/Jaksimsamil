import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
const HomeContainer = ({ histroy }) => {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));

  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  });
  return <HomeForm />;
};
export default withRouter(HomeContainer);
