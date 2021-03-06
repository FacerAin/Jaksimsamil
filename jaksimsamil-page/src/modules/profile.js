import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import produce from 'immer';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'profile/INITIALIZE';
const CHANGE_FIELD = 'profile/CHANGE_FIELD';
const [SET_BJID, SET_BJID_SUCCESS, SET_BJID_FAILURE] = createRequestActionTypes(
  'profile/SET_BJID',
);
const [
  SET_SLACK,
  SET_SLACK_SUCCESS,
  SET_SLACK_FAILURE,
] = createRequestActionTypes('/profile/SET_SLACK');
const [
  SET_GOALNUM,
  SET_GOALNUM_SUCCESS,
  SET_GOALNUM_FAILURE,
] = createRequestActionTypes('/profile/SET_GOALNUM');
const [
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
] = createRequestActionTypes('profile/GET_PROFILE');

const [
  SYNC_BJID,
  SYNC_BJID_SUCCESS,
  SYNC_BJID_FAILURE,
] = createRequestActionTypes('profile/SYNC_BJID');
export const initializeProfile = createAction(INITIALIZE);
export const syncBJID = createAction(SYNC_BJID, ({ username }) => ({
  username,
}));

export const setSLACK = createAction(
  SET_SLACK,
  ({ username, slackWebHookURL }) => ({
    username,
    slackWebHookURL,
  }),
);

export const setGOALNUM = createAction(
  SET_GOALNUM,
  ({ username, goalNum }) => ({
    username,
    goalNum,
  }),
);
export const setBJID = createAction(SET_BJID, ({ username, userBJID }) => ({
  username,
  userBJID,
}));

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const getPROFILE = createAction(GET_PROFILE, ({ username }) => ({
  username,
}));
const initialState = {
  username: '',
  userBJID: '',
  solvedBJ: '',
  friendList: [],
  profileError: '',
  slackWebHookURL: '',
  solvedBJ_date: '',
  goalNum: '',
};
const getPROFILESaga = createRequestSaga(GET_PROFILE, profileAPI.getPROFILE);
const setBJIDSaga = createRequestSaga(SET_BJID, profileAPI.setBJID);
const setSLACKSaga = createRequestSaga(SET_SLACK, profileAPI.setPROFILE);
const setGOALNUMSaga = createRequestSaga(SET_GOALNUM, profileAPI.setPROFILE);
const syncBJIDSaga = createRequestSaga(SYNC_BJID, profileAPI.syncBJ);

export function* profileSaga() {
  yield takeLatest(SET_BJID, setBJIDSaga);
  yield takeLatest(GET_PROFILE, getPROFILESaga);
  yield takeLatest(SYNC_BJID, syncBJIDSaga);
  yield takeLatest(SET_SLACK, setSLACKSaga);
  yield takeLatest(SET_GOALNUM, setGOALNUMSaga);
}

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),
    [GET_PROFILE_SUCCESS]: (
      state,
      {
        payload: {
          username,
          userBJID,
          solvedBJ,
          friendList,
          slackWebHookURL,
          solvedBJ_date,
          goalNum,
        },
      },
    ) => ({
      ...state,
      username: username,
      userBJID: userBJID,
      solvedBJ: solvedBJ,
      friendList: friendList,
      profileError: null,
      slackWebHookURL: slackWebHookURL,
      solvedBJ_date: solvedBJ_date,
      goalNum: goalNum,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),

    [SET_BJID_SUCCESS]: (state, { payload: { userBJID } }) => ({
      ...state,
      userBJID: userBJID,
      profileError: null,
    }),
    [SET_BJID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SET_SLACK_SUCCESS]: (state, { payload: { slackWebHookURL } }) => ({
      ...state,
      slackWebHookURL: slackWebHookURL,
      profileError: null,
    }),
    [SET_SLACK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SET_GOALNUM_SUCCESS]: (state, { payload: { goalNum } }) => ({
      ...state,
      goalNum: goalNum,
    }),
    [SET_GOALNUM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
    [SYNC_BJID_SUCCESS]: (state, { payload: { solvedBJ } }) => ({
      ...state,
      solvedBJ,
      profileError: null,
    }),
    [SYNC_BJID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profileError: error,
    }),
  },
  initialState,
);
