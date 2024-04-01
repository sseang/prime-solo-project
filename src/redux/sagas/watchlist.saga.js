import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "WATCH_LIST" actions

function* fetchWatchList(action) {
  console.log('In the FETCH Watchlist!');
  try {
    // Get the WATCH_LIST:
    const watchListResponse = yield axios.get(
      `/api/watchlist/${action.payload}`
    );
    console.log('Fetch WatchList Response:', watchListResponse);
    // Set the value of the WATCH_LIST reducer:
    yield put({
      type: 'SET_WATCH_LIST',
      payload: watchListResponse.data,
    });
  } catch (error) {
    console.log('fetchAllWATCH_LIST error:', error);
  }
}

function* updateWatchListSaga(action) {
  console.log('running POST SAGA:', action);

  // try catch block
  try {
    // POST a new element to server
    yield axios({
      method: 'POST',
      url: '/api/watchlist',
      data: action.payload,
    });
    // dispatch to refresh GET
    // yield put({ type: 'FETCH_WATCH_LIST' });
  } catch (error) {
    // error surface to user
    console.log('ERROR ADDING WATCH_LIST:', error);
  }
}

function* watchListSaga() {
  yield takeEvery('FETCH_WATCH_LIST', fetchWatchList);
  yield takeEvery('ADD_WATCH_LIST', updateWatchListSaga);
}

export default watchListSaga;
