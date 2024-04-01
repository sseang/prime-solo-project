import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'primereact/image';

import './DetailsPage.css';

function DetailsPage() {
  const user = useSelector((store) => store.user);
  const details = useSelector((store) => store.details);
  console.log('Details:', details);
  const id = useParams();
  let [newAnime, setNewAnime] = useState({
    user_id: user.id,
    animeList_id: '',
  });

  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_DETAILS', payload: id });
  // }, []);
  // // TODO- selector for anime

  const addToWatchListHandle = (details) => {
    dispatch({
      type: 'ADD_WATCH_LIST',
      payload: { user_id: user.id, animeList_id: details.id },
    });

    //specify data and push ID
    console.log('UPDATE WATCH_LIST :', user.id, details.id);
  };

  const handleOnNav = (event) => {
    console.log('In my NAV');
    //prevent refresh
    event.preventDefault();
    //add path
    history.push('/user');
  };

  return (
    <div>
      <h2>Details</h2>
      {details.map((details, index) => {
        return (
          <pre key={details.id}>
            <h3>{details.title}</h3>
            <div>
              Genres: <p>{details.Genres}</p>
            </div>
            <Image src={details.poster} alt="Image" preview />
            {/* <Image
              src={details.poster}
              zoomSrc={details.poster}
              alt="Image"
              width="300"
              height="300"
              preview
            /> */}

            <p className="description">{details.description}</p>
            <span>
              <p>Director: {details.director}</p> {''}{' '}
              <p>Year Published: {details.year_published}</p>
            </span>
            <button
              onClick={() => addToWatchListHandle(details)}
              className="detailBtn">
              Add to Watch List?
            </button>
            <div>
              <button className="detailBtn" onClick={handleOnNav} type="btn">
                Back
              </button>
            </div>
          </pre>
        );
      })}
    </div>
  );
}

export default DetailsPage;
