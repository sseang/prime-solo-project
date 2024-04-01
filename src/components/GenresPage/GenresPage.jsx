import React from 'react';

import { useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';

function GenresPage() {
  const user = useSelector((store) => store.user);
  const genres = useSelector((store) => store.genres);
  console.log('Genres!:', genres);
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
                <button className="genresBtn">Add to Watch List?</button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default GenresPage;
