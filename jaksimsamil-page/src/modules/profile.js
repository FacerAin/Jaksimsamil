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

export const setBJID = createAction(SET_BJID, ({ username, BJID }) => ({
  username,
  BJID,
}));

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));

const initialState = {
  username: '',
  userBJID: '',
  solvedBJ: '',
  friendList: [],
  BJIDError: '',
};

const setBJIDSaga = createRequestSaga(SET_BJID, profileAPI.setBJID);
export function* profileSaga() {
  yield takeLatest(SET_BJID, setBJIDSaga);
}

export default handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value;
      }),

    [SET_BJID_SUCCESS]: (state, { payload: BJID }) => ({
      ...state,
      BJID,
      BJIDError: null,
    }),
    [SET_BJID_FAILURE]: (state, { payload: error }) => ({
      ...state,
      BJIDError: error,
    }),
  },
  initialState,
);
