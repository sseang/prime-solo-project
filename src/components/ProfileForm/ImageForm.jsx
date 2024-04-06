import { useState, useEffect } from 'react';
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';

function ImageForm() {
  // const cld = new Cloudinary({
  //   cloud: { cloudName: process.env.REACT_APP_CLOUD_NAME },
  // });
  let [imagePath, setImagePath] = useState('');
  let [imageList, setImageList] = useState([]);

  const onFileChange = async (event) => {
    // Access the selected file
    const fileToUpload = event.target.files[0];

    // Limit to specific file types.
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('upload_preset', process.env.REACT_APP_PRESET);
      let postUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
      axios
        .post(postUrl, formData)
        .then((response) => {
          console.log('Success!', response);
          setImagePath(response.data.url);
        })
        .catch((error) => {
          console.log('error', error);
          alert('Something went wrong');
        });
    } else {
      alert('Please select an image');
    }
  };

  const sendPhotoToServer = (event) => {
    event.preventDefault();
    // Send image path to YOUR server
    axios
      .post('/api/photos', { path: imagePath })
      .then((response) => {
        getImageList();
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong!');
      });
  };

  const getImageList = () => {
    // Don't use '/images'! It will return the images in the public folder.
    axios
      .get('/api/photos')
      .then((response) => {
        setImageList(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Something went wrong!');
      });
  };

  // useEffect(() => {
  //   getImageList();
  // }, []);

  return (
    <div className="formPanel" id="container">
      <header>
        <h1>Image Upload with Cloudinary</h1>
      </header>
      <h2>Upload Image</h2>
      <form onSubmit={sendPhotoToServer}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <br />
        {imagePath === '' ? (
          <p>Please select an image</p>
        ) : (
          <img style={{ maxWidth: '150px' }} src={imagePath} />
        )}
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Images</h2>
      {imageList.length > 0 ? (
        imageList.map((image) => (
          <img
            key={image.id}
            className="gallery-image"
            src={image.path}
            alt="Add an alt tag!"
          />
        ))
      ) : (
        <p>No images!</p>
      )}
    </div>
  );
}

export default ImageForm;
