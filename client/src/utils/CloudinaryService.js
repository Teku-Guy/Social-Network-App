import { Cloudinary as CoreCloudinary, Util } from "cloudinary-core";

export const url = (public_id, options) => {
  try {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new({
        cloud_name: 'media-base',
        secure: true
      }
    );
    console.log(cl)
    return cl.url(public_id, scOptions);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const openUploadWidget = (options, callback) => {
  return window.cloudinary.openUploadWidget(options, callback);
};