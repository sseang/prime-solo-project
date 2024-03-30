import { combineReducers } from 'redux';

// Used to store WATCH_LIST returned from the server

const watchList = (state = [], action) => {
  switch (action.type) {
    case 'SET_WATCH_LIST':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default watchList;
