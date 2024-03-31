import React from 'react';

import { useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';

function GenresPage() {
  const user = useSelector((store) => store.user);
  const genres = useSelector((store) => store.genres);
  return (
    <div className="container">
      <SearchForm />
      <h2>GENRES</h2>
      <h3>Welcome, {user.username}!</h3>
      <h4></h4>
      <button>Add to Watch List</button>
    </div>
  );
}

export default GenresPage;
