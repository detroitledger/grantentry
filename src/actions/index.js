import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchUserpdfs = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_USERPDFS_REQUEST',
  });

  return api.fetchUserpdfs().then(
    response => {
      dispatch({
        type: 'FETCH_USERPDFS_SUCCESS',
        response,
      });
    },
    error => {
      dispatch({
        type: 'FETCH_USERPDFS_FAILURE',
        message: error.message || 'Something went wrong.',
      });
    }
  );
};

export const updateUserpdf = (id, currentpg, done) => (dispatch) => {
  dispatch({
    type: 'UPDATE_USERPDF_REQUEST',
    request: { currentpg, done } // TODO: store this in state & drop duplicate requests
  });

  return api.updateUserpdf(id, currentpg, done).then(response => {
    dispatch({
      type: 'UPDATE_USERPDF_SUCCESS',
      response,
    });
  });
}

export const fetchCurrentUser = () => (dispatch) => {
  dispatch({
    type: 'FETCH_CURRENTUSER_REQUEST',
  });

  return api.fetchCurrentUser().then(response => {
    dispatch({
      type: 'FETCH_CURRENTUSER_SUCCESS',
      response,
    });
  });
}