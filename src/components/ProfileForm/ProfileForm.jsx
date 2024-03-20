import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfileForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const userProfile = (event) => {
    event.preventDefault();

    dispatch({
      type: 'PROFILE',
      payload: {
        username: username,
        password: password,
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
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default ProfileForm;
