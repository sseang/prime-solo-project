import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import SearchForm from '../SearchForm/SearchForm';
import './UserPage.css';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <SearchForm />
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <h3>Top Rated Anime</h3>
      <div>
        <p>Title</p>
        {/* <img /> */}
      </div>
      <h4>Genres</h4>
      <span className="genres">
        <button className="genresButtons">Action</button>
        <button className="genresButtons">Adventure</button>
        <button className="genresButtons">Comedy</button>
        <button className="genresButtons">Drama</button>
        <button className="genresButtons">Fantasy</button>
        <button className="genresButtons">Horror</button>
        <button className="genresButtons">Psychological</button>
        <button className="genresButtons">Romance</button>
        <button className="genresButtons">Sci-Fi</button>
        <button className="genresButtons">Thriller</button>
      </span>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
