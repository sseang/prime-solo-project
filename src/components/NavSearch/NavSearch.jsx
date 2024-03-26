import React from 'react';
import { Link } from 'react-router-dom';
import './Nav2.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function NavSearch() {
  const user = useSelector((store) => store.user);
  const [animeSearch, setAnimeSearch] = useState({ title: '' });

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_GIPHY', payload: animeSearch });
    setAnimeSearch({ tile: '' });
  };

  return (
    <div>
      <div>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/watchlist">
              Watch List
            </Link>
          </>
        )}
      </div>
      <div>
        <form>
          <input
            id="search"
            placeholder="Search Title"
            type="text"
            value={animeSearch.title}
            onChange={(event) =>
              setAnimeSearch({ ...animeSearch, title: event.target.value })
            }
          />
          <button onClick={handleSearch}>Find ?</button>
        </form>
      </div>
    </div>
  );
}

export default NavSearch;
