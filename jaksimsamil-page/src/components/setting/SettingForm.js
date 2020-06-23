import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import BJIDForm from './BJIDForm';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: palette.gray[2],
  },
  paper: {
    margin: 'auto',
    textAlign: 'center',
    padding: 30,
  },
}));

const SettingForm = ({ onChange, onBJIDSubmit, profile, onSyncBJIDSubmit }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>{profile.username}</h3>
          </Paper>
        </Grid>
        <Grid container item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <BJIDForm
              profile={profile}
              onChange={onChange}
              onBJIDSubmit={onBJIDSubmit}
              onSyncBJIDSubmit={onSyncBJIDSubmit}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingForm;
