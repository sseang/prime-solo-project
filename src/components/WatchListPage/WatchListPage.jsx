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
    getWatchList();
    console.log('WATCH_LIST', watchList);
    console.log('USER_LIST', user);
  }, []);

  const getWatchList = () => {
    dispatch({ type: 'FETCH_WATCH_LIST', payload: user.id });
  };

  const deleteAnimeItem = (watchList) => {
    dispatch({ type: 'DELETE_WATCH_LIST_ITEM', payload: watchList.id });
    console.log('In the DELETE watch list function!', watchList.id);
    //alt method to send data dispatch({ type: 'DELETE_PLANT', payload: { id: plant.id } });
  };

  const handleUpdateLike = (watchList) => {
    dispatch({ type: 'UPDATE_ITEM', payload: watchList.id });
    console.log('In the UPDATE LIKE function!', watchList.id);
  };

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
                <button
                  className="watchlistBtn"
                  onClick={() => deleteAnimeItem(watchList)}>
                  Remove from Watch List?
                </button>
                <div>
                  {watchList.isLiked ? (
                    <p>You Liked this Anime!</p>
                  ) : (
                    <button
                      className="watchlistBtn"
                      onClick={() => handleUpdateLike(watchList)}>
                      LIKE?
                    </button>
                  )}
                </div>
                {/* TODO- create UPDATE route in watchlist.js  */}
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
