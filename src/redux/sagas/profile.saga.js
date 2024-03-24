import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "PROFILE" actions
function* profileUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_PROFILE_ERROR' });

    // after the user has logged in
    // get the user information from the server
    yield put({ type: 'FETCH_USER' });

    // passes the favorite_genres and avatar from the payload to the server
    yield axios.put('/api/user:id', action.payload);
    alert('Profile added:', action.payload);
  } catch (error) {
    console.log('Error with profile submit:', error);
    yield put({ type: 'PROFILE_FAILED' });
  }
}

function* profileSaga() {
  yield takeLatest('UPDATE_USER', profileUser);
}

export default profileSaga;
