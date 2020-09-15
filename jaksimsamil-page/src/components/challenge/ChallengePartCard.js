import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    margin: 'auto',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ChallengeInfoCard = ({ ChallengeInfo, onParticipate }) => {
  const classes = useStyles();
  console.log(ChallengeInfo);
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <h2>{ChallengeInfo.challengeName}</h2>
        <h3>{ChallengeInfo.startDate + ' - ' + ChallengeInfo.endDate}</h3>
        <Button
          onClick={() => onParticipate(ChallengeInfo.challengeName)}
          className={classes.button}
          variant="outlined"
          color="primary"
        >
          참가
        </Button>
      </Paper>
    </Grid>
  );
};

export default ChallengeInfoCard;
