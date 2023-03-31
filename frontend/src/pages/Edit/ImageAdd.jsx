import React, { useState } from 'react';
import upload_icon from 'assets/icons/upload-Icon.png';

function ImageAdd({ id, onUpload, onDelete }) {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      onUpload(id, file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    onDelete(id);
  };

  return (
    <div className="image-add">
      {image ? (
        <div className="image-preview">
          <img src={URL.createObjectURL(image)} alt="" />
          <button onClick={handleImageDelete}>Delete Image</button>
        </div>
      ) : (
        <div className="image-upload">
          <label htmlFor={`image-upload-${id}`} className="image-upload-label">
            Click to upload image
          </label>
          <input
            id={`image-upload-${id}`}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      )}
    </div>
  );
}
export default ImageAdd;
