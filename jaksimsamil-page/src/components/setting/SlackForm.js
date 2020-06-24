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
}));

const SlackForm = ({ onChange, profile, onSlackURLSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={onSlackURLSubmit}>
        <TextField
          name="slackWebHookURL"
          onChange={onChange}
          value={profile.slackWebHookURL}
          placeholder="슬랙 Webhook URL"
          label="슬랙 Webhook URL"
        />
        <Button variant="outlined" type="submit">
          등록
        </Button>
      </form>
    </div>
  );
};

export default SlackForm;
