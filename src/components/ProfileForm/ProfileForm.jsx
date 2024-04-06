import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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

  let [imagePath, setImagePath] = useState('');
  //let [imageList, setImageList] = useState([]);
  //let imagePath = useSelector((store) => store.imagePathReducer);
  //let dispatch = useDispatch();
  const onFileChange = async (event) => {
    // Access the selected file
    const fileToUpload = event.target.files[0];

    // Limit to specific file types.
    const acceptedImageTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/jpg',
    ];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      console.log('meta.env: ', import.meta.env.VITE_CLOUD_NAME);
      formData.append('upload_preset', import.meta.env.VITE_PRESET);
      let postUrl = `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`;
      axios
        .post(postUrl, formData)
        .then((response) => {
          console.log('Success!', response);
          setImagePath(response.data.url);
          setAvatar();
          dispatch({
            type: 'UPDATE_USER',
            payload: {
              id: user.id,
              favorite_genres: favorite,
              avatar: response.data.url,
            },
          });
        })
        .catch((error) => {
          console.log('error', error);
          alert('Something went wrong');
        });
    } else {
      alert('Please select an image');
    }
  };

  // const sendPhotoToServer = (event) => {
  //   event.preventDefault();
  //   // Send image path to YOUR server
  //   axios
  //     .post('/api/photos', { path: imagePath })
  //     .then((response) => {
  //       setAvatar();
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert('Something went wrong!');
  //     });
  // };

  const userProfile = (id) => {
    //event.preventDefault();
    console.log('In the PROFILE function!');
    dispatch({ type: 'FETCH_USER' });
    alert('Profile Updated!!');
    history.push('/user');
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
          {/* <input
            type="text"
            name="avatar"
            value={avatar}
            required
            onChange={(event) => setAvatar(event.target.value)}
          /> */}
          {/* TODO- need to add AWS S3 bucket to hold upload */}
          <input type="file" accept="image/*" onChange={onFileChange} />
          <br />
          {imagePath === '' ? (
            <p>Would you like to add an image?</p>
          ) : (
            <img style={{ maxWidth: '150px' }} src={imagePath} />
          )}
          <br />
        </label>
      </div>
      <div>
        <input
          //onClick={() => sendPhotoToServer(avatar)}
          className="btn"
          type="submit"
          name="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}

export default ProfileForm;
