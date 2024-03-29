// Used to store Top ANIME returned from the server

const topRatedAnime = (state = [], action) => {
  switch (action.type) {
    case 'SET_TOP_ANIME':
      return action.payload;
    default:
      return state;
  }
};
export default topRatedAnime;
