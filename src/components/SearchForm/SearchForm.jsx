import React from 'react';
import { Link } from 'react-router-dom';
//import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//nav to new form
import { useHistory } from 'react-router-dom';

function SearchForm() {
  const user = useSelector((store) => store.user);
  const searchId = useSelector((store) => store.anime.searchAnime);
  console.log('SEARCH ID:', searchId);
  //const [animeSearch, setAnimeSearch] = useState({ title: '' });
  const [animeSearch, setAnimeSearch] = useState([]);

  // const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('q');
  //const location = useLocation();
  const dispatch = useDispatch();
  //use push to new page
  const history = useHistory();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch({ type: 'SEARCH_ANIME', payload: animeSearch });
    //specify data and push ID
    console.log('SEARCH :', searchId.id);
    //history.push(`/api/details/${searchId.id}`);
    setAnimeSearch('');
  };

  const handleDetail = (searchId) => {
    dispatch({ type: 'FETCH_DETAILS', payload: searchId.id });

    //specify data and push ID
    console.log('DETAILS ID :', searchId.id);
    history.push(`/details`);
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
              //setAnimeSearch({ ...animeSearch, title: event.target.value })
              setAnimeSearch(event.target.value)
            }
            value={animeSearch}
          />
          <button onClick={handleSearch}>Find ?</button>
        </form>
        <div>
          {' '}
          <h2>Search Results: {searchId.title}</h2>
          <ul>
            <img onClick={() => handleDetail(searchId)} src={searchId.poster} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
