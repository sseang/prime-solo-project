import React from 'react';

import { useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';

function WatchListPage() {
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <SearchForm />
      <h2>Your Watch List</h2>
      <h3>Welcome, {user.username}!</h3>
      <span>
        {/* TODO- create DELETE route in watchlist.js */}
        <button>Remove from Watchlist</button>
        {/* TODO- create UPDATE route in watchlist.js  */}
        <button>LIKE?</button>
      </span>
    </div>
  );
}

export default WatchListPage;
