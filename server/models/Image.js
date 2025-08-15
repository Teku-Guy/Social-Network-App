import { Schema, model } from 'mongoose';

const ImageSchema = new Schema(
  {
    img_type: String,
    location: String,
    owner: String,
    createdAt: String,
  }
);

const Image = model('Image', ImageSchema);

export default Image;