import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SettingForm from '../components/setting/SettingForm';
import SettingContainer from '../containers/setting/SettingContainer';

const SettingPage = () => {
  return (
    <div>
      <HeaderContainer />
      <SettingContainer></SettingContainer>
    </div>
  );
};

export default SettingPage;
