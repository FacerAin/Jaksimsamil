import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as challengeAPI from '../lib/api/challenge';

const INITIALIZE = 'challenge/INITIALIZE';
const [
  GET_CHALLENGE,
  GET_CHALLENGE_SUCCESS,
  GET_CHALLENGE_FAILURE,
] = createRequestActionTypes('challenge/GET_CHALLENGE');

export const initializeChallenge = createAction(INITIALIZE);
export const getChallenge = createAction(GET_CHALLENGE, ({ status }) => ({
  status,
}));

const initilState = {};

const getChallenge = createRequestSaga(GET_CHALLENGE, profileAPI.challengeAPI);

export default handleActions({
  [INITIALIZE]: () => {
    initilState;
  },
  [GET_CHALLENGE_SUCCESS]:
    (state,
    {
      payload: {},
    }),
});
