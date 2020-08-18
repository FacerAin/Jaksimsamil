import React from 'react';
import palette from '../../lib/styles/palette';
import BJIDForm from './BJIDForm';
import SlackForm from './SlackForm';
import GoalNumForm from './GoalNumForm';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: palette.gray[2],
    padding: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(8),
    margin: 'auto',
    textAlign: 'center',
  },
}));

const LoadingParentStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const SettingForm = ({
  onChange,
  onBJIDSubmit,
  onSlackURLSubmit,
  profile,
  onSyncBJIDSubmit,
  onGoalNumSubmit,
  isLoading,
}) => {
  const classes = useStyles();
  return isLoading ? (
    <LoadingParentStyle>
      <CircularProgress className={classes.loading} />
    </LoadingParentStyle>
  ) : (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid container item xs={6}>
          <Paper className={classes.paper} elevation={3}>
            <h1>백준 아이디</h1>
            <BJIDForm
              profile={profile}
              onChange={onChange}
              onBJIDSubmit={onBJIDSubmit}
              onSyncBJIDSubmit={onSyncBJIDSubmit}
            />
          </Paper>
        </Grid>

        <Grid container item xs={6}>
          <Paper className={classes.paper} elevation={3}>
            <h1>슬랙 Hook URL</h1>
            <SlackForm
              profile={profile}
              onChange={onChange}
              onSlackURLSubmit={onSlackURLSubmit}
            />
          </Paper>
        </Grid>

        <Grid container item xs={6}>
          <Paper className={classes.paper} elevation={3}>
            <h1>일일 목표</h1>
            <GoalNumForm
              profile={profile}
              onChange={onChange}
              onGoalNumSubmit={onGoalNumSubmit}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SettingForm;
