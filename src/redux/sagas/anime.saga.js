import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ANIME" actions

function* fetchAnime() {
  console.log('In the FETCH Anime!');
  try {
    // Get the ANIME:
    const animeResponse = yield axios.get('/api/anime');
    console.log('Fetch Anime Response:', animeResponse);
    // Set the value of the ANIME reducer:
    yield put({
      type: 'SET_ANIME',
      payload: animeResponse.data,
    });
  } catch (error) {
    console.log('fetchAllANIME error:', error);
  }
}

function* fetchTop() {
  console.log('In the FETCH TOP Anime!');
  try {
    // Get TOP ANIME:
    const animeResponse = yield axios.get('/api/anime/top');
    console.log('Fetch TOP Response:', animeResponse);
    // Set the value of the TOP_ANIME reducer:
    yield put({
      type: 'SET_TOP_ANIME',
      payload: animeResponse.data,
    });
  } catch (error) {
    console.log('fetchAllANIME error:', error);
  }
}

function* animeSaga() {
  yield takeEvery('FETCH_ANIME', fetchAnime);
  yield takeEvery('FETCH_TOP_ANIME', fetchTop);
}

export default animeSaga;
