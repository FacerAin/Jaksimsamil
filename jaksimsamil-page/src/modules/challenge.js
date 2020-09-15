import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as challengeAPI from '../lib/api/challenge';

const INITIALIZE = 'challenge/INITIALIZE';
const [
  GET_CHALLENGE_LIST,
  GET_CHALLENGE_LIST_SUCCESS,
  GET_CHALLENGE_LIST_FAILURE,
] = createRequestActionTypes('challenge/GET_CHALLENGE_LIST');

const [
  GET_CHALLENGE_USER,
  GET_CHALLENGE_USER_SUCCESS,
  GET_CHALLENGE_USER_FAILURE,
] = createRequestActionTypes('challenge/GET_CHALLENGE_USER');

const [
  PARTICIPATE_CHALLENGE,
  PARTICIPATE_CHALLENGE_SUCCESS,
  PARTICIPATE_CHALLENGE_FAILURE,
] = createRequestActionTypes('challenge/PARTICIPATE_CHALLENGE');

export const initializeChallenge = createAction(INITIALIZE);
export const getChallengelist = createAction(
  GET_CHALLENGE_LIST,
  (status) => status,
);

export const getChallengeuser = createAction(
  GET_CHALLENGE_USER,
  (username) => username,
);
export const participateChallenge = createAction(
  PARTICIPATE_CHALLENGE,
  ({ username, challengeName }) => ({
    username,
    challengeName,
  }),
);
const initilState = {
  challengeList: [],
  challengeUser: [],
  challengeError: '',
  participateError: '',
};

const getChallengelistSaga = createRequestSaga(
  GET_CHALLENGE_LIST,
  challengeAPI.list,
);

const getChallengeuserSaga = createRequestSaga(
  GET_CHALLENGE_USER,
  challengeAPI.getChallengeByUsername,
);
const participateChallengeSaga = createRequestSaga(
  PARTICIPATE_CHALLENGE,
  challengeAPI.participate,
);
export function* challengeSaga() {
  yield takeLatest(GET_CHALLENGE_LIST, getChallengelistSaga);
  yield takeLatest(GET_CHALLENGE_USER, getChallengeuserSaga);
  yield takeLatest(PARTICIPATE_CHALLENGE, participateChallengeSaga);
}

export default handleActions(
  {
    [INITIALIZE]: () => initilState,
    [GET_CHALLENGE_LIST_SUCCESS]: (state, { payload: challengeList }) => ({
      ...state,
      challengeList: challengeList,
      challengeError: null,
    }),
    [GET_CHALLENGE_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      challengeError: error,
    }),

    [GET_CHALLENGE_USER_SUCCESS]: (state, { payload: challengeList }) => ({
      ...state,
      challengeUser: challengeList,
      challengeError: null,
    }),
    [GET_CHALLENGE_USER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      challengeError: error,
    }),
    [PARTICIPATE_CHALLENGE_SUCCESS]: (state) => ({
      ...state,
      participateError: null,
    }),
    [PARTICIPATE_CHALLENGE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      participateError: error,
    }),
  },
  initilState,
);
