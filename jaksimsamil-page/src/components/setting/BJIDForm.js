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

const BJIDForm = ({ onChange, onBJIDSubmit, profile, onSyncBJIDSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <form>
        <TextField
          name="userBJID"
          onChange={onChange}
          value={profile.userBJID}
          placeholder="백준 아이디"
          label="백준 아이디"
        />
      </form>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={onBJIDSubmit}
        color="primary"
      >
        등록
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={onSyncBJIDSubmit}
        color="secondary"
      >
        동기화
      </Button>
    </div>
  );
};
export default BJIDForm;
