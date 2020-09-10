import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    margin: 'auto',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const ChallengeInfoCard = ({ ChallengeInfo }) => {
  const classes = useStyles();
  console.log(ChallengeInfo);
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <h2>{ChallengeInfo.challengeName}</h2>
        <h3>{ChallengeInfo.startDate + ' - ' + ChallengeInfo.endDate}</h3>
      </Paper>
    </Grid>
  );
};

export default ChallengeInfoCard;
