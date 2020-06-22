import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
const BJIDFormBlock = styled.div`
  width: 100%;
  border-top: 1px solid ${palette.gray[2]};
  padding-top: 2rem;
  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

const BJIDForm = ({ onChange, onBJIDSubmit, profile }) => {
  return (
    <BJIDFormBlock>
      <h4>백준 아이디</h4>
      <input
        name="userBJID"
        onChange={onChange}
        value={profile.userBJID}
        placeholder="백준 아이디"
      />
      <button type="submit" onSubmit={onBJIDSubmit}>
        등록
      </button>
    </BJIDFormBlock>
  );
};
export default BJIDForm;
