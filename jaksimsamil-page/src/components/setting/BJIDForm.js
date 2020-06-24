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

const BJIDForm = ({ onChange, onBJIDSubmit, profile, onSyncBJIDSubmit }) => {
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={onBJIDSubmit}>
        <TextField
          name="userBJID"
          onChange={onChange}
          value={profile.userBJID}
          placeholder="백준 아이디"
          label="백준 아이디"
        />
        <Button variant="outlined" type="submit">
          등록
        </Button>
      </form>
      <Button variant="outlined" onClick={onSyncBJIDSubmit}>
        동기화
      </Button>
    </div>
  );
};
export default BJIDForm;
