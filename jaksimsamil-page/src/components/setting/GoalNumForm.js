import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const GoalNumForm = ({ onChange, profile, onGoalNumSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <form>
        <TextField
          name="goalNum"
          type="number"
          onChange={onChange}
          value={profile.goalNum}
          placeholder="일일 목표"
          label="일일 목표"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <Button
        className={classes.button}
        onClick={onGoalNumSubmit}
        color="primary"
        variant="outlined"
      >
        등록
      </Button>
    </div>
  );
};

export default GoalNumForm;
