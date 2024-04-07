import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import './WatchListPage.css';

import { useEffect } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

function WatchListPage() {
  const user = useSelector((store) => store.user);
  const watchList = useSelector((store) => store.watchList);
  const dispatch = useDispatch();

  useEffect(() => {
    getWatchList();
  }, []);

  const getWatchList = () => {
    dispatch({ type: 'FETCH_WATCH_LIST', payload: user.id });
  };

  const deleteAnimeItem = (watchList) => {
    console.log('WATCH_LIST', watchList);
    console.log('USER_LIST', user);
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
                <div>
                  <Button
                    variant="contained"
                    fontSize="small"
                    className="watchlistBtn"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteAnimeItem(watchList)}>
                    Remove from List?
                  </Button>
                </div>
                <div>
                  {watchList.isLiked ? (
                    <p className="isWatched">You Liked this Anime!</p>
                  ) : (
                    <FavoriteIcon
                      fontSize="large"
                      className="watchlistBtn"
                      onClick={() => handleUpdateLike(watchList)}>
                      LIKE?
                    </FavoriteIcon>
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
