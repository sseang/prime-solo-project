import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "GENRES" actions

function* fetchGenres(action) {
  console.log('In the FETCH Genres!');
  try {
    // Get the GENRES:
    const genresResponse = yield axios.get(`/api/genres/${action.payload}`);
    console.log('Fetch Genres Response:', genresResponse);
    // Set the value of the GENRES reducer:
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data,
    });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('fetchAllGENRES error:', error);
  }
}

function* genresSaga() {
  yield takeEvery('FETCH_GENRES', fetchGenres);
}

export default genresSaga;
