import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';

function GenresPage() {
  const user = useSelector((store) => store.user);
  const genres = useSelector((store) => store.genres);
  const watchList = useSelector((store) => store.watchList);
  const dispatch = useDispatch();
  console.log('Genres!:', genres);

  // useEffect(() => {
  //   dispatch ({
  //     type: 'SET_WATCH_LIST',
  //     payload: { user_id: user.id, animeList_id: genres.id },
  //   });
  // }, []);

  const addToWatchListHandle = (genres) => {
    dispatch({
      type: 'ADD_WATCH_LIST',
      payload: { user_id: user.id, animeList_id: genres.id },
    });

    //specify data and push ID
    console.log('UPDATE WATCH_LIST :', user.id, genres.id);
  };

  return (
    <div className="container">
      <SearchForm />
      <h3>Welcome, {user.username}!</h3>
      <section className="anime">
        {genres.map((genres) => {
          return (
            <div key={genres.id}>
              <h2>{genres.Genre}</h2>
              <h4>{genres.title}</h4>
              <img src={genres.poster} />
              <div>
                <button
                  className="genresBtn"
                  onClick={() => addToWatchListHandle(genres)}>
                  Add to Watch List?
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default GenresPage;
