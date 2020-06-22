import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import BJIDForm from './BJIDForm';

const SettingFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
  background: ${palette.gray[2]};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
const SectionContainer = styled.div`
  display: flex;
`;

const SettingForm = ({ onChange, onBJIDSubmit, profile }) => {
  console.log(profile);
  return (
    <SettingFormBlock>
      <SectionContainer>
        <h3>{profile.username}</h3>
        <p>입력</p>
      </SectionContainer>

      <SectionContainer>
        <BJIDForm
          profile={profile}
          onChange={onChange}
          onBJIDSubmit={onBJIDSubmit}
        />
      </SectionContainer>

      <SectionContainer>
        <h3>친구</h3>
        <StyledInput name="BJID" placeholder="친구 아이디" />
        <Button>추가</Button>
      </SectionContainer>
      <h3>친구 리스트</h3>
    </SettingFormBlock>
  );
};

export default SettingForm;
