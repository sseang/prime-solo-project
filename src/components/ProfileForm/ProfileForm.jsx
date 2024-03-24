import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

function ProfileForm() {
  //username redundant
  // const [username, setUsername] = useState('');
  const [favorite, setFavorite] = useState('');
  const [avatar, setAvatar] = useState('');

  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = (id) => {
    event.preventDefault();
    console.log('In the PROFILE function!');

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        id: user.id,
        favorite_genres: favorite,
        avatar: avatar,
      },
    });
    //history.push('/user');
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={() => userProfile(user.id)}>
      <h2>Edit Profile</h2>
      <p>Welcome, {user.username}!</p>
      <p>Your ID is: {user.id}</p>
      {errors.profileMessage && (
        <h3 className="alert" role="alert">
          {errors.profileMessage}
        </h3>
      )}

      {/* entering usename 2x seems redundant */}
      {/* <div>
        <label htmlFor="username">
          User ID:
          <input
            type="text"
            name="userID"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div> */}
      <div>
        <label htmlFor="favorite">
          Favorite Genres:
          <input
            type="text"
            name="favorite"
            value={favorite}
            required
            onChange={(event) => setFavorite(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="avatar">
          Upload Avatar:
          <input
            type="text"
            name="avatar"
            value={avatar}
            required
            onChange={(event) => setAvatar(event.target.value)}
          />
          <button>Browse File</button>
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Submit" />
      </div>
    </form>
  );
}

export default ProfileForm;
