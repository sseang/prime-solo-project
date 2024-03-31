import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import './WatchListPage.css';

import { useEffect } from 'react';

function WatchListPage() {
  const user = useSelector((store) => store.user);
  const watchList = useSelector((store) => store.watchList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_WATCH_LIST', payload: user.id });
    console.log('WATCH_LIST', watchList);
    console.log('USER_LIST', user);
  }, []);

  return (
    <div className="container">
      <SearchForm />
      <h2>Your Watch List</h2>
      <h3>Welcome, {user.username}!</h3>

      <section className="anime">
        {watchList.map((watchList) => {
          return (
            <div key={watchList.id}>
              <h4>{watchList.title}</h4>
              <img src={watchList.poster} />

              <div>
                <button className="watchlistBtn">Remove from Watchlist</button>
                {/* TODO- create UPDATE route in watchlist.js  */}
                <button className="watchlistBtn">LIKE?</button>
              </div>
              <p className="isWatched">
                <i>{watchList.isWatched ? 'Previously Viewed' : ''}</i>
              </p>
            </div>
          );
        })}
        {/* TODO- create DELETE route in watchlist.js */}
      </section>
    </div>
  );
}

export default WatchListPage;
