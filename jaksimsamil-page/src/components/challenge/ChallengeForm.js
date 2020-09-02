import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import palette from '../../lib/styles/palette';
import Typography from '@material-ui/core/Typography';
import ChallengeInfoCard from './ChallengeInfoCard';

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
    color: theme.palette.text.secondary,
  },
}));

const ChallengeForm = ({ options, setViewcategory, setPartcategory }) => {
  const testlist = [1, 2, 3, 4, 5, 6, 7];
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary>
              <Typography>챌린지 참여하기</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper className={classes.paper}>
                챌린지 참여하기
                <Autocomplete
                  onChange={(e, newValue) => {
                    setPartcategory(newValue);
                  }}
                  autoHighlight
                  style={{ width: 300 }}
                  options={options}
                  getOptionLabel={(option) => option.label}
                  renderOption={(option) => <Fragment>{option.label}</Fragment>}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="검색 기준"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        Autocomplete: 'new-password',
                      }}
                    />
                  )}
                />
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            참여중인 챌린지
            <Autocomplete
              autoHighlight
              style={{ width: 300 }}
              options={options}
              onChange={(e, newValue) => {
                setViewcategory(newValue);
              }}
              getOptionLabel={(option) => option.label}
              renderOption={(option) => <Fragment>{option.label}</Fragment>}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="검색 기준"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    Autocomplete: 'new-password',
                  }}
                />
              )}
            />
            <Grid container spacing={5}>
              {testlist.map((name) => (
                <ChallengeInfoCard />
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

/*
TODO:
챌린지 목록
챌린지 이름
챌린지 기간 (Start - End)
챌린지 세션 정보 (일 간격과 목표 문제)
그룹 원 정보.
*/
export default ChallengeForm;
