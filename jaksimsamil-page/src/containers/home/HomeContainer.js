import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HomeForm from '../../components/home/HomeForm';
import { getPROFILE, initializeProfile } from '../../modules/profile';
const HomeContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [HMArr, setHMArr] = useState([]);
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));

  const makeHeatmapValues = (PSdata) => {
    let obj_keys = Object.keys(PSdata);
    let result = [];
    for (let i = 0; i < obj_keys.length; i++) {
      result.push({
        date:
          //2019-10-15
          obj_keys[i].slice(0, 4) +
          '-' +
          obj_keys[i].slice(4, 6) +
          '-' +
          obj_keys[i].slice(6, 8),
        count: PSdata[obj_keys[i]].length,
      });
    }
    return result;
  };

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
    if (profile.solvedBJ_date) {
      setHMArr(makeHeatmapValues(profile.solvedBJ_date.solvedBJbyDATE));
    }
  }, [profile]);
  useEffect(() => {
    if (user) {
      let username = user.username;
      dispatch(getPROFILE({ username }));
    }
  }, [dispatch, user]);
  return (
    <HomeForm
      PSdata={profile.solvedBJ_date}
      HMArr={HMArr}
      goalNum={profile.goalNum}
    />
  );
};
export default withRouter(HomeContainer);
