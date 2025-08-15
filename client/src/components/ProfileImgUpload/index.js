import React, { useState, useContext } from 'react';
import { Button } from "@mui/material";
import { useMutation } from '@apollo/client';

import { openUploadWidget } from "../../utils/CloudinaryService";
import { AuthContext } from '../../utils/AuthContext';
import {UPLOAD_PROFILE_IMG_URL} from '../../utils/mutations';

const ProfileImgUpload = (props) => {
  const {user} = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState('');
  const [imgUpload] = useMutation(UPLOAD_PROFILE_IMG_URL, {
    variables: {
      username: user.data.username,
      url: imgUrl
    }
  })
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        folder: `profiles/${props.username}`,
        tags: ["profile", props.username],
        maxImageWidth: 600,
        sources: ["local", "url", "camera"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setImgUrl(result.info.secure_url);
          props.onImageUpload(result.info.public_id);
        }
        if (!error && result.event === "close") {
          imgUpload();
        }

      }
    );
    myUploadWidget.open();
  };

  return (
    <Button variant="outlined" onClick={uploadImageWidget}>
      Upload Image
    </Button>
  );
};

export default ProfileImgUpload;