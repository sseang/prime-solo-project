const images = (state = '', action) => {
  // set recommendationsList with data from server
  if (action.type === 'SET_IMAGE_PATH') {
    return action.payload;
  }
  return state;
};

export default images;
