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
};
const getPROFILESaga = createRequestSaga(GET_PROFILE, profileAPI.getPROFILE);
const setBJIDSaga = createRequestSaga(SET_BJID, profileAPI.setBJID);
const syncBJIDSaga = createRequestSaga(SYNC_BJID, profileAPI.syncBJ);
export function* profileSaga() {
  yield takeLatest(SET_BJID, setBJIDSaga);
  yield takeLatest(GET_PROFILE, getPROFILESaga);
  yield takeLatest(SYNC_BJID, syncBJIDSaga);
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
      { payload: { username, userBJID, solvedBJ, friendList } },
    ) => ({
      ...state,
      username: username,
      userBJID: userBJID,
      solvedBJ: solvedBJ,
      friendList: friendList,
      profileError: null,
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
