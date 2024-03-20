import React from 'react';

import { useHistory } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';

function ProfilePage() {
  const history = useHistory();

  return (
    <div>
      <ProfileForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}>
          Logout
        </button>
      </center>
    </div>
  );
}

export default ProfilePage;
