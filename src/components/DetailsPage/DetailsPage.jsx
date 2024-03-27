import React from 'react';

import { useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';

import { useHistory } from 'react-router-dom';

function DetailsPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  // TODO- selector for anime

  const handleOnNav = (event) => {
    console.log('In my NAV');
    //prevent refresh
    event.preventDefault();
    //add path
    history.push('/user');
  };

  return (
    <div className="container">
      <SearchForm />
      <h2>Welcome, {user.username}!</h2>
      <h3>Anime Title</h3>
      {/* TODO-map() here for anime
      {details.map((detailData, index) => (
        <pre key={index}>
          <h3>{detailData.title}</h3>
          <div>
            Genres: <p>{detailData.name}</p>
          </div>
          TODO-resize img w/ primeReact!!
          <img src={detailData.poster} />
          <p >{detailData.description}</p>

        </pre>
      ))} */}
      <div>
        <button onClick={handleOnNav} type="btn">
          Back
        </button>
      </div>
    </div>
  );
}

export default DetailsPage;
