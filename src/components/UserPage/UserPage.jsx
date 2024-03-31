import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import './UserPage.css';
import { useEffect } from 'react';

//nav to new form
import { useHistory } from 'react-router-dom';

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
  }, []);

  const handleGenres = () => {
    dispatch({ type: 'FETCH_GENRES', payload: genresId });

    //specify data and push ID
    console.log('GENRES :', genresId);
    history.push(`/genres`);
  };

  return (
    <div className="container">
      {/* TODO-need to fix searchSaga */}
      <SearchForm />
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <h3 className="pageTitles">Top Rated Anime</h3>
      <div className="anime">
        {topRated.map((topRated) => {
          return (
            <div key={topRated.id}>
              <h4>{topRated.title}</h4>
              <img src={topRated.poster} />
            </div>
          );
        })}
      </div>
      <h3>Genres</h3>
      {/* TODO- onclick to push to GenresPAge  */}
      <span className="genres">
        <button
          onClick={() => handleGenres(genresId)}
          className="genresButtons"
          value={(genresId = 1)}>
          Action
        </button>
        <button onClick={handleGenres} className="genresButtons" value="2">
          Adventure
        </button>
        <button onClick={handleGenres} className="genresButtons" value="3">
          Comedy
        </button>
        <button onClick={handleGenres} className="genresButtons" value="4">
          Drama
        </button>
        <button onClick={handleGenres} className="genresButtons" value="5">
          Fantasy
        </button>
        <button onClick={handleGenres} className="genresButtons" value="6">
          Horror
        </button>
        <button onClick={handleGenres} className="genresButtons" value="7">
          Psychological
        </button>
        <button onClick={handleGenres} className="genresButtons" value="8">
          Romance
        </button>
        <button onClick={handleGenres} className="genresButtons" value="9">
          Sci-Fi
        </button>
        <button onClick={handleGenres} className="genresButtons" value="10">
          Thriller
        </button>
      </span>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
