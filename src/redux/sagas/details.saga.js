import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "DETAILS" actions

function* fetchDetails(action) {
  console.log('In the FETCH Details!');
  try {
    // Get the DETAILS:
    const detailsResponse = yield axios.get(`/api/anime/${action.payload}`);
    console.log('Fetch details Response:', detailsResponse.data);
    // Set the value of the DETAILS reducer:
    yield put({
      type: 'SET_DETAILS',
      payload: detailsResponse.data,
    });
  } catch (error) {
    console.log('fetchAllDETAILS error:', error);
  }
}

function* detailsSaga() {
  yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;
