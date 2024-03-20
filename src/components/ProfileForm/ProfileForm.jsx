import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfileForm() {
  const [username, setUsername] = useState('');
  const [favorite, setFavorite] = useState('');
  const [avatar, setAvatar] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const userProfile = (event) => {
    event.preventDefault();

    dispatch({
      type: 'PROFILE',
      payload: {
        username: username,
        favorite: favorite,
        avatar: avatar,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={userProfile}>
      <h2>Add Profile</h2>
      {errors.profileMessage && (
        <h3 className="alert" role="alert">
          {errors.profileMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Re-enter username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
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
            onChange={(event) => setFavorite(event.target.value)}
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
