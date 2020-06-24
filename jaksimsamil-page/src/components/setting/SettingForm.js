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
  },
  paper: {
    margin: 'auto',
    textAlign: 'center',
    padding: 30,
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

        <Grid container item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <SlackForm
              profile={profile}
              onChange={onChange}
              onSlackURLSubmit={onSlackURLSubmit}
            />
          </Paper>
        </Grid>

        <Grid container item xs={12}>
          <Paper className={classes.paper} elevation={3}>
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
