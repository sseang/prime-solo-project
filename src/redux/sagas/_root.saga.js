import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import profileSaga from './profile.saga';
import searchSaga from './search.saga';
import animeSaga from './anime.saga';
import watchListSaga from './watchlist.saga';
import detailsSaga from './details.saga';
import genresSaga from './genres.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    profileSaga(),
    searchSaga(),
    animeSaga(),
    watchListSaga(),
    detailsSaga(),
    genresSaga(),
  ]);
}
