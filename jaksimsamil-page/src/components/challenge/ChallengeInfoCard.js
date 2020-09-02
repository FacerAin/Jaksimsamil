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

const ChallengeInfoCard = () => {
  const classes = useStyles();
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>TEST</Paper>
    </Grid>
  );
};

export default ChallengeInfoCard;
