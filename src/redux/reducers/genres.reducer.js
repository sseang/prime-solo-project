import { combineReducers } from 'redux';

// Used to store GENRES returned from the server

const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default genres;
