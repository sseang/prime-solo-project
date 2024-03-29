// Used to store movies returned from the server
const anime = (state = [], action) => {
  switch (action.type) {
    case 'SET_ANIME':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default anime;
