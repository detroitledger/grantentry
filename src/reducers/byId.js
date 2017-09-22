const byId = (state = {}, action = { type: null }) => {
  switch (action.type) {
    case 'FETCH_USERPDFS_SUCCESS': // TODO: test multiple events dispatched to reducer
    case 'UPDATE_USERPDF_SUCCESS':
      if (action && action.response) {
        return {
          ...state,
          ...action.response,
        };
      }
    default:
      return state;
  }
};

export default byId;

export const getUserpdf = (state, id) => state[id];