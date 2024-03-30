import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "WATCHLIST" actions

function* fetchWatchList() {
  console.log('In the FETCH Watchlist!');
  try {
    // Get the ANIME:
    const watchListResponse = yield axios.get('/api/watchlist');
    console.log('Fetch Response:', watchListResponse);
    // Set the value of the ANIME reducer:
    yield put({
      type: 'SET_ANIME',
      payload: watchListResponse.data,
    });
  } catch (error) {
    console.log('fetchAllANIME error:', error);
  }
}

function* watchListSaga() {
  yield takeEvery('FETCH_WATCHLIST', fetchWatchList);
}

export default watchListSaga;
