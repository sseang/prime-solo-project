import { combineReducers } from 'redux';

// Used to store DETAILS returned from the server

const details = (state = [], action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default details;
