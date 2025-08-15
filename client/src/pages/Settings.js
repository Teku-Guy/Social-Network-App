import React, { useContext, useState } from "react";
import {Cloudinary} from "@cloudinary/url-gen";

import { AuthContext } from '../utils/AuthContext';
import ProfileImgUpload from "../components/ProfileImgUpload";

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
  };

  return (
    <>
      <h1>
        {user.data.username}
      </h1>
      <ProfileImgUpload
        cloud_name={cld.cloudinaryConfig.cloud.cloudName}
        upload_preset={cld.cloudinaryConfig.cloud.uploadPreset}
        username={user.data.username}
        onImageUpload={(publicId) => onImageUploadHandler(publicId)}
      />
    </>
  );

}

export default Settings;