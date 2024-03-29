import { combineReducers } from 'redux';

// Used to store ANIME returned from the server

const anime = (state = [], action) => {
  switch (action.type) {
    case 'SET_ANIME':
      return action.payload;
    default:
      return state;
  }
};

const searchAnime = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  anime,
  searchAnime,
});
