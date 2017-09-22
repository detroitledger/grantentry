const user = (state = { id: null, name: null, isFetching: false }, action = { type: null, response: null}) => {
  switch (action.type) {
    case 'FETCH_CURRENTUSER_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_CURRENTUSER_SUCCESS':
      return { ...state, ...action.response, isFetching: false };
    default:
      return state;
  }
};

export default user;