import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "PROFILE" actions
function* profileUser(action) {
  console.log('PROFILE', action.payload);
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_PROFILE_ERROR' });

    //passes the favorite_genres and avatar from the payload to the server
    yield axios.put(`/api/user/${action.payload.id}`);
    yield put({ type: 'UPDATE_PROFILE', payload: action.payload });
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
