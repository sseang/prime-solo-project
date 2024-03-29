import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "PROFILE" actions

function* fetchAnime() {
  console.log('In the FETCH Anime!');
  try {
    // Get the movies:
    const animeResponse = yield axios.get('/api/anime');
    console.log('Fetch Response:', animeResponse);
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_ANIME',
      payload: animeResponse.data,
    });
  } catch (error) {
    console.log('fetchAllANIME error:', error);
  }
}

function* animeSaga() {
  yield takeEvery('FETCH_ANIME', fetchAnime);
}

export default animeSaga;
