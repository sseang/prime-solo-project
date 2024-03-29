import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function SearchForm() {
  const user = useSelector((store) => store.user);
  const [animeSearch, setAnimeSearch] = useState({ title: '' });
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_ANIME', payload: animeSearch });
    setAnimeSearch({ tile: '' });
  };

  return (
    <div>
      <div>
        <form>
          <input
            id="search"
            placeholder="Search Title"
            type="text"
            onChange={(event) =>
              setAnimeSearch({ ...animeSearch, title: event.target.value })
            }
          />
          <button onClick={handleSearch} value={animeSearch.title}>
            Find ?
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchForm;
