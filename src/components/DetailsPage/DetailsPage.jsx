import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Image } from 'primereact/image';

import './DetailsPage.css';

function DetailsPage() {
  const user = useSelector((store) => store.user);
  const details = useSelector((store) => store.details);
  console.log('Details:', details);
  const id = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_DETAILS', payload: id });
  // }, []);
  // // TODO- selector for anime

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
          <pre key={index}>
            <h3>{details.title}</h3>
            <div>
              Genres: <p>{details.Genres}</p>
            </div>
            <Image src={details.poster} alt="Image" preview />
            <p className="description">{details.description}</p>
            <span>
              <p>Director: {details.director}</p> {''}{' '}
              <p>Year Published: {details.year_published}</p>
            </span>
            <button className="detailBtn">Add to Watch List?</button>
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
