import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, setBJID } from '../../modules/profile';
import SettingForm from '../../components/setting/SettingForm';
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

  const onBJIDSubmit = (e) => {
    e.preventDefault();
    let username = profile.username;
    let userBJID = profile.userBJID;
    dispatch(setBJID({ username, userBJID }));
  };

  useEffect(() => {
    //Do Init Form
    console.log(profile);
  }, [dispatch]);

  return (
    <SettingForm
      type="setting"
      onChange={onChange}
      onBJIDSubmit={onBJIDSubmit}
      profile={profile}
    ></SettingForm>
  );
};

export default withRouter(SettingContainer);
