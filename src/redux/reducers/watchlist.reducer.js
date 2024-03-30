import { combineReducers } from 'redux';

// Used to store WATCHLIST returned from the server

const watchList = (state = [], action) => {
  switch (action.type) {
    case 'SET_WATCHLIST':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  watchList,
});
