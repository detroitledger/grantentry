import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import byId, * as fromById from './byId';
import createList, * as fromList from './createList';
import user from './user';
import tour from './tour';

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed'),
});

const preTourState = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case 'SAVE_PRE_TOUR_STATE':
      return action.state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  byId,
  listByFilter,
  user,
  tour,
  router,
  preTourState,
});

export default rootReducer;

export const getVisibleUserpdfs = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getUserpdf(state.byId, id));
};

export const getHasPDFs = (pdfs, pdfId) => {
  return !(
    !pdfs.length ||
    !pdfId ||
    !pdfs.find(p => p.id === parseInt(pdfId, 10))
  );
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
