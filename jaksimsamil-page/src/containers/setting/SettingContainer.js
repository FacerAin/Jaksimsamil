import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import {
  changeField,
  setBJID,
  getPROFILE,
  syncBJID,
  initializeProfile,
  setSLACK,
  setGOALNUM,
} from '../../modules/profile';
import SettingForm from '../../components/setting/SettingForm';

const SettingContainer = ({ history }) => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user, profile, loading } = useSelector(
    ({ user, profile, loading }) => ({
      user: user.user,
      profile: profile,
      loading: loading,
    }),
  );

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value: value,
      }),
    );
  };

  const onSyncBJIDSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    dispatch(syncBJID({ username }));
  };

  const onGoalNumSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    let goalNum = profile.goalNum;
    dispatch(setGOALNUM({ username, goalNum }));
  };
  const onSlackURLSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    let slackWebHookURL = profile.slackWebHookURL;
    dispatch(setSLACK({ username, slackWebHookURL }));
  };

  const onBJIDSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    let userBJID = profile.userBJID;

    dispatch(setBJID({ username, userBJID }));
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
    if (loading['profile/SYNC_BJID'] == true) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return (
    <div>
      <SettingForm
        type="setting"
        onChange={onChange}
        onBJIDSubmit={onBJIDSubmit}
        onSyncBJIDSubmit={onSyncBJIDSubmit}
        onSlackURLSubmit={onSlackURLSubmit}
        onGoalNumSubmit={onGoalNumSubmit}
        profile={profile}
        isLoading={isLoading}
      ></SettingForm>
    </div>
  );
};

export default withRouter(SettingContainer);
