import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import './UserPage.css';
import { useEffect } from 'react';

//nav to new form
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const anime = useSelector((store) => store.anime);
  const topRated = useSelector((store) => store.topRated);
  let [genresId, setGenresId] = useState('');
  //use push to new page
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'FETCH_ANIME' });
    dispatch({ type: 'FETCH_TOP_ANIME' });
    dispatch({ type: 'FETCH_WATCH_LIST', payload: user.id });
  }, []);

  const handleGenres = () => {
    dispatch({ type: 'FETCH_GENRES', payload: genresId });
    setGenresId('');
    //specify data and push ID
    console.log('GENRES :', genresId);
    history.push(`/genres`);
  };

  const handleTopRatedDetail = (topRated) => {
    dispatch({ type: 'FETCH_DETAILS', payload: topRated.id });

    //specify data and push ID
    console.log('TOP RATED ID :', topRated.id);
    history.push(`/details`);
  };
  return (
    <div>
      {/* TODO-need to fix searchSaga */}
      <SearchForm />
      <div className="user">
        <h2>Welcome, {user.username}!</h2>
        <Avatar
          className="userAvatar"
          src={user.avatar}
          sx={{ width: 100, height: 100 }}
        />
        <p>Your ID is: {user.id}</p>
        <b>Favorite Genres: {user.favorite_genres}</b>
      </div>
      <h2 className="pageTitles">Top Rated Anime</h2>
      <div className="anime">
        {topRated.map((topRated) => {
          return (
            <div key={topRated.id}>
              <h4>{topRated.title}</h4>
              <img
                onClick={() => handleTopRatedDetail(topRated)}
                src={topRated.poster}
              />
            </div>
          );
        })}
      </div>
      <h2 className="pageTitles">Genres</h2>
      {/* TODO- onclick to push to GenresPAge  */}
      <span className="genres">
        <button
          onClick={() => handleGenres(genresId)}
          className="genresButtons"
          value={(genresId = 1)}>
          Action
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 1))}
          className="genresButtons"
          value={genresId + 1}>
          Adventure
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 2))}
          className="genresButtons"
          value={genresId + 2}>
          Comedy
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 3))}
          className="genresButtons"
          value={genresId + 3}>
          Drama
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 4))}
          className="genresButtons"
          value={genresId + 4}>
          Fantasy
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 5))}
          className="genresButtons"
          value={genresId + 5}>
          Horror
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 6))}
          className="genresButtons"
          value={genresId + 6}>
          Psychological
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 7))}
          className="genresButtons"
          value={genresId + 7}>
          Romance
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 8))}
          className="genresButtons"
          value={genresId + 8}>
          Sci-Fi
        </button>
        <button
          onClick={() => handleGenres((genresId = genresId + 9))}
          className="genresButtons"
          value={genresId + 9}>
          Thriller
        </button>
      </span>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
