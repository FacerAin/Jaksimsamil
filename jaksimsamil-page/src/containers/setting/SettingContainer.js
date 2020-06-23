import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  setBJID,
  getPROFILE,
  syncBJID,
  initializeProfile,
} from '../../modules/profile';
import SettingForm from '../../components/setting/SettingForm';

const SettingContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(({ user, profile }) => ({
    user: user.user,
    profile: profile,
  }));

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

  const onBJIDSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    let userBJID = profile.userBJID;

    dispatch(setBJID({ username, userBJID }));
  };

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다  ');
      history.push('/');
    } else {
      let username = user.username;
      dispatch(getPROFILE({ username }));
      return () => {
        dispatch(initializeProfile());
      };
    }
  }, [dispatch, user, history]);

  return (
    <SettingForm
      type="setting"
      onChange={onChange}
      onBJIDSubmit={onBJIDSubmit}
      onSyncBJIDSubmit={onSyncBJIDSubmit}
      profile={profile}
    ></SettingForm>
  );
};

export default withRouter(SettingContainer);
