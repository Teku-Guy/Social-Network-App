

import { Button } from "@mui/material";
import { openUploadWidget } from "../../utils/CloudinaryService";

const ImageUpload = (props) => {
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
          props.onImageUpload(result.info.secure_url);
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

export default ImageUpload;