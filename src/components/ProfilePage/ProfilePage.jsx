import React from 'react';

import { useHistory } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm';
//import ImageForm from '../ProfileForm/ImageForm';

function ProfilePage() {
  const history = useHistory();

  return (
    <div>
      <ProfileForm />
      {/* <ImageForm /> */}

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
