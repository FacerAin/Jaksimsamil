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

const SlackForm = ({ onChange, profile, onSlackURLSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <form>
        <TextField
          name="slackWebHookURL"
          onChange={onChange}
          value={profile.slackWebHookURL}
          placeholder="슬랙 Webhook URL"
          label="슬랙 Webhook URL"
        />
      </form>
      <Button
        className={classes.button}
        onSubmit={onSlackURLSubmit}
        variant="outlined"
        type="submit"
        color="primary"
      >
        등록
      </Button>
    </div>
  );
};

export default SlackForm;
