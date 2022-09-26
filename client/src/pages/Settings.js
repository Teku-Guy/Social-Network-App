import React, { useContext } from "react";
import Auth from "../utils/auth";
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {CloudinaryContext, Image} from 'cloudinary-react';

import { AuthContext } from '../utils/AuthContext';

function Settings(){
  const { user } = useContext(AuthContext);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'media-base'
    }
  });
  //upload to the cloud then upload to server http as string

  return (
    <>
    <h1>
      {user.data.username}
    </h1>
    </>
  );

}

export default Settings;