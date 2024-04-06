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
    const postResponse = yield axios({
      method: 'POST',
      url: '/api/watchlist',
      data: action.payload,
    });
    // dispatch to refresh GET
    console.log('POST Anime Response:', postResponse);

    // yield put({
    //   type: 'FETCH_WATCH_LIST',
    //   payload: postResponse.data[0].user_id,
    // });
    alert('Title added to Watch List!');
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    // error surface to user
    console.log('ERROR ADDING WATCH_LIST:', error);
  }
}

function* deleteAnimeSaga(action) {
  console.log('running DELETE SAGA:', action);
  // try catch block
  try {
    // DELETE plant from server
    const deleteResponse = yield axios({
      method: 'DELETE',
      //url back ticks struture convention for call to server
      url: `/api/watchlist/${action.payload}`,
    });

    console.log('Fetch DELETE WatchList Response:', deleteResponse);
    alert('Title Removed from Watch List!');
    // yield put({
    //   type: 'FETCH_WATCH_LIST',
    //   payload: deleteResponse.data[0].user_id,
    // });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    // error surface to user
    console.log('ERROR DELETING WATCH_LIST:', error);
  }
}

function* updateLiKeItem(action) {
  console.log('In the UPDATE LIKE Funtion!');
  try {
    // UPDATE the LIKE WATCH_LIST:
    const likeResponse = yield axios.put(`/api/watchlist/${action.payload}`);
    console.log('UPDATE LIKE WatchList Response:', likeResponse);
    // Set the value of the WATCH_LIST reducer:

    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('ERROR UPDATING LIKE WATCH_LIST:', error);
  }
}

function* watchListSaga() {
  yield takeEvery('FETCH_WATCH_LIST', fetchWatchList);
  yield takeEvery('ADD_WATCH_LIST', updateWatchListSaga);
  yield takeEvery('DELETE_WATCH_LIST_ITEM', deleteAnimeSaga);
  yield takeEvery('UPDATE_ITEM', updateLiKeItem);
}

export default watchListSaga;
