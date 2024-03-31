import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DetailsPage() {
  const user = useSelector((store) => store.user);
  const details = useSelector((store) => store.details);
  console.log('Details:', details);
  const id = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: id });
  }, []);
  // TODO- selector for anime

  const handleOnNav = (event) => {
    console.log('In my NAV');
    //prevent refresh
    event.preventDefault();
    //add path
    history.push('/user');
  };

  return (
    <section className="container">
      <SearchForm />
      <h2>Welcome, {user.username}!</h2>
      <h3>Anime Title</h3>
      <div>
        {/* TODO-map() here for anime*/}
        {details.map((details, index) => {
          return (
            <pre key={details.id}>
              <h3>{details.title}</h3>
              <div>
                Genres: <p>{details.name}</p>
              </div>
              {/* TODO-resize img w/ primeReact!! */}
              <img src={details.poster} />
              <p>{details.description}</p>
            </pre>
          );
        })}
      </div>
      <div>
        <button onClick={handleOnNav} type="btn">
          Back
        </button>
      </div>
    </section>
  );
}

export default DetailsPage;
