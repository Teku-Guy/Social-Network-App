import React, { useContext, useState } from "react";
import {Cloudinary} from "@cloudinary/url-gen";

import { AuthContext } from '../utils/AuthContext';
import ImageUpload from "../components/ImageUpload";

function Settings(){
  const { user } = useContext(AuthContext);
  const [imgId, setImgId] = useState([]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'media-base',
      uploadPreset: 'unsigned'
    }
  });
  //upload to the cloud then upload to server http as string

  const onImageUploadHandler = (publicId) => {
    setImgId((prevState) => [...prevState, publicId]);
    console.log(imgId[imgId.length - 1])
  };

  return (
    <>
      <h1>
        {user.data.username}
      </h1>
      <ImageUpload
        cloud_name={cld.cloudinaryConfig.cloud.cloudName}
        upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
        username={user.data.username}
        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
      />
    </>
  );

}

export default Settings;