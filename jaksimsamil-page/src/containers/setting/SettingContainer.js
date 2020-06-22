import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  changeField,
  setBJID,
  getPROFILE,
  syncBJID,
} from '../../modules/profile';
import SettingForm from '../../components/setting/SettingForm';
import { sync } from '../../../node_modules/fast-glob/index';
const SettingContainer = ({ history }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
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
    console.log('1');
    let username = JSON.parse(user).username;
    dispatch(getPROFILE({ username }));
    //Do Init Form
  }, [dispatch]);

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
