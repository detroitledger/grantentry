const orgs = (state = { isFetching: false, byId: {} }, action = { type: null, response: null}) => {
  switch (action.type) {
    case 'FETCH_ORGS_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_ORGS_SUCCESS':
      return {
          ...state,
          isFetching: false,
          byId: {
              ...state.byId,
              ...action.response,
          },
      };
      case 'FETCH_ORGS_FAILURE':
        return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default orgs;
