import { push } from 'react-router-redux';

import store from 'store/dist/store.modern';

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

export const updateUserpdf = (id, currentpg, done) => (dispatch, getState) => {
  // Don't update if tour is going.
  if (!getState().tour.active) {
    dispatch({
      type: 'UPDATE_USERPDF_REQUEST',
      request: { currentpg, done }, // TODO: store this in state & drop duplicate requests
    });

    return api.updateUserpdf(id, currentpg, done).then(response => {
      dispatch({
        type: 'UPDATE_USERPDF_SUCCESS',
        response,
      });
    });
  }
};

export const createGrant = (grantData) => (dispatch) => {
  dispatch({
    type: 'CREATE_GRANT_REQUEST',
  });

  return api.createGrant(grantData)
    .then(
      response => {
        dispatch({
          type: 'CREATE_GRANT_SUCCESS',
          response,
        });
      },
      error => {
        dispatch({
          type: 'CREATE_GRANT_FAILURE',
          error,
        });
      }
    );
};

export const tourSetStep = step => (dispatch) => {
  if (step === 2) {
    // Go to our sample entry
    dispatch(push('/' + 6));
  }

  return Promise.resolve(dispatch({
    type: 'TOUR_SET_STEP',
    step,
  }));
};

export const tourStop = () => (dispatch, getState) => {
  dispatch({
    type: 'RESTORE_PRE_TOUR_STATE',
    oldState: getState().preTourState,
  });

  // Go back home
  dispatch(push('/'));

  return Promise.resolve(dispatch({ type: 'TOUR_STOP' }));
};

export const tourStart = () => (dispatch, getState) => {
  dispatch({
    type: 'SAVE_PRE_TOUR_STATE',
    state: getState(),
  });

  // Set up some fake state, for show.
  dispatch({
    type: 'FETCH_USERPDFS_SUCCESS',
    response: {
      '6': {
        id: 6,
        org: {
          id: 35,
          name: 'Auntie Na\'s House',
        },
        pdfurl: 'https://data.detroitledger.org/sites/default/files/grantentrypdfs/382530980_201412_990.pdf',
        done: false,
        year: 2013,
        currentpg: 4,
      },
      '7': {
        id: 7,
        org: {
          id: 3679,
          name: 'Men Who Dare, Inc',
        },
        pdfurl: 'https://data.detroitledger.org/sites/default/files/grantentrypdfs/382530980_201412_990.pdf',
        done: false,
        year: 2016,
        currentpg: 0,
      },
    },
  });

  return Promise.resolve(dispatch({ type: 'TOUR_START' }));
};

// Google OAuth

let auth2session; // result of gapi.auth2.init
const { gapi } = window;

const getGoogleOAuth2Session = async () => {
  if (!auth2session) {
    await new Promise((resolve, reject) => {
      gapi.load('auth2', {
        callback: resolve,
        onerror: reject,
        ontimeout: reject,
        timeout: 10000,
      });
    });
    auth2session = await gapi.auth2.init({ client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID });
  }
  return auth2session;
};

const getNewGoogleOAuthToken = async () => {
  const auth = await getGoogleOAuth2Session();
  const { id_token } = await auth.currentUser.get().reloadAuthResponse();
  return id_token;
};

export const refreshGoogleOAuthToken = () => async (dispatch) => {
  const id_token = await getNewGoogleOAuthToken();
  dispatch({ type: 'AUTH_SET_ID_TOKEN', idToken: id_token });
  store.set('idToken', id_token);
  return id_token;
};

export const getUserWithSavedToken = () => async (dispatch) => {
  if (!store.get('idToken')) {
    try {
      const id_token = await getNewGoogleOAuthToken();
      dispatch({ type: 'AUTH_SET_ID_TOKEN', idToken: id_token });
      store.set('idToken', id_token);
    } catch (e) {
      if (e.idpId === 'google' && e.type === 'userLoggedOut') {
        console.log('welcome back ;) ;)');
      } else if (e.idpId === 'google' && e.type === 'noSessionBound') {
        console.warn('no session available', e);
      } else {
        console.error('strange error', e);
      }
    }
  }

  // Now we might have a token...
  if (store.get('idToken')) {
    dispatch({ type: 'AUTH_REQUEST' });
    try {
      const id_token = store.get('idToken');
      const response = await api.authApiCall('getGoogleUser', id_token);
      if (response.user) {
        dispatch({ type: 'AUTH_SET_ID_TOKEN', idToken: id_token });
        dispatch({ type: 'AUTH_SUCCESS', response });
      } else if (response.error) {
        if (response.error.includes('Token expired')) {
          await refreshGoogleOAuthToken()(dispatch);
          await getUserWithSavedToken()(dispatch);
        } else {
          dispatch({ type: 'AUTH_FAILURE', response });
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', response: { error: 'Auth error: bad response from server' } });
      }
    } catch (e) {
      dispatch({ type: 'AUTH_FAILURE', response: { error: 'Auth error: error thrown by API client' } });
    }
  }
};

export const login = () => async (dispatch) => {
  dispatch({ type: 'AUTH_REQUEST' });

  const auth = await getGoogleOAuth2Session();

  try {
    const user = await auth.signIn();
    const { id_token } = user.getAuthResponse(true);
    store.set('idToken', id_token);

    const response = await api.authApiCall('getGoogleUser', id_token);

    dispatch({ type: 'AUTH_SUCCESS', response });
  } catch (e) {
    dispatch({ type: 'AUTH_FAILURE', response: { error: 'enable popup windows please' } });
  }
};

export const logout = () => async (dispatch) => {
  const auth = await getGoogleOAuth2Session();

  try {
    await auth.signOut();
  } catch (e) {
    console.error('Error in Google OAuth2 signout', e);
  }

  try {
    store.remove('idToken');
  } catch (e) {
    console.error('Error in store.remove', e);
  }

  dispatch({ type: 'AUTH_LOGOUT' });
};


export const callGoogleAuthEndpoint = (path) => async (dispatch, getState) => {
  const response = await api.authApiCall(path, getState().auth.idToken);
  if (response.error) {
    if (response.error.includes('Token expired')) {
      await refreshGoogleOAuthToken()(dispatch);
      return callGoogleAuthEndpoint(path)(dispatch);
    } else {
      // oops
      return response;
    }
  }
  return response;
};